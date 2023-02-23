import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Clock } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import artGeo from '../../assets/models/art_ani.fbx';

export const setupHomePageObjects = ( scene, renderer, 
    camera, quality, mobileAspectRatio) => {

    // Changes size and position of objects depending on if using mobile device or not
    let boxXPos = 0, planeXPos = 0, boxSize = 0, planeSize = 0;
    if(mobileAspectRatio === false){
        boxXPos = -1;
        boxSize = 0.7;
        planeXPos = 1;
        planeSize = 0.9;
    } else {
        boxXPos = -0.5;
        boxSize = 0.5;
        planeXPos = 0.5;
        planeSize = 0.7;
    }
    let boxGeo = new THREE.BoxGeometry( boxSize, boxSize, boxSize );
    let greenMat = new THREE.MeshPhongMaterial({
        color: 0x44ff22,
    });
    let tempBox = new THREE.Mesh( boxGeo, greenMat );
    tempBox.position.set( boxXPos, -0.9, -5.5 );

    let fPlaneGeo = new THREE.PlaneGeometry( planeSize, planeSize, 1 );
    let firstPlane = new THREE.Mesh( fPlaneGeo, greenMat );
    firstPlane.position.set( planeXPos, -0.9, -5.5 );

    let triGeo = new THREE.ConeGeometry( 0.6, 0.6 );
    let triMesh = new THREE.Mesh(triGeo, greenMat);
    triMesh.position.set( 0.8, -3.95, -5 );

    let torGeo = new THREE.TorusGeometry( 0.2, 0.2 );
    let torMesh = new THREE.Mesh(torGeo, greenMat);
    torMesh.position.set( 8.5, -7.2, -3 );

    let sphGeo = new THREE.SphereGeometry( 0.3, 5, 5 );
    let sphMesh = new THREE.Mesh(sphGeo, greenMat);
    sphMesh.position.set( 15.8, -10.25, -3.5 );

    scene.add( tempBox );
    scene.add( firstPlane );
    scene.add( triMesh );
    scene.add( torMesh );
    //scene.add( sphMesh );

    let fbxObjects = {};
    //==============================
    // Adding FBX files to project
    //==============================
    const loader = new FBXLoader();

    // Load the scene groups of models, anmiations, etc from .fbx files
    let artGroup;
    let artMixer;
    loader.load(artGeo, (fbx) => {

        artGroup = fbx;

        artGroup.traverse((obj) => {
            if (obj.name === 'Cube' || obj.name === 'Cylinder') {
                obj.material = greenMat;
            }
        });

        artGroup.scale.setScalar(0.0009);
        artGroup.position.set( 19, -12.25, -3 );
        artGroup.rotation.set( 0, 1, 0 );

        artMixer = new THREE.AnimationMixer(artGroup);
        if (artGroup.animations.length > 0) {
            artMixer.clipAction( artGroup.animations[0] ).play();
        };

        scene.add( artGroup );

        renderer.render( scene, camera );
        fbxObjects.artGroup = artGroup;
        fbxObjects.artMixer = artMixer;
    
        animate(fbxObjects);
    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });
    //==================================================================================================

    // Input setup
    const moveCamera = () => {

        const currentScrollPos = document.body.getBoundingClientRect().top;

        camera.rotation.y = currentScrollPos * -0.0019;
        camera.position.z = currentScrollPos * 0.004;
        camera.position.x = currentScrollPos * -0.01;
        camera.position.y = currentScrollPos * 0.006;

        scrollFadeAnimations(currentScrollPos);
    }

    document.body.onscroll = moveCamera;

    // Adding a bunch of random green cubes everywhere
    const addCube = () => {
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x005500,
        });
        const box = new THREE.Mesh( geo, mat);
        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread( 150 ));
        box.position.set(x,y,z);
        scene.add(box);
        return box;
    }

    let cubeArray = [];
    for(let i = 0; i < 600/(quality*2); i++){
        cubeArray.push(addCube());
    }

    // Adding background grid animation
    const rectGeo = new THREE.BoxGeometry( 0.3,0.3,0.3 );
    const rectGeo2 = new THREE.BoxGeometry( 0.3,0.3,0.3 );
    const rectMat = new THREE.MeshBasicMaterial({
        color: 0x007700,
    });
    let rectsVert = [];
    let rectsHori = [];
    for(let y = 0; y < 18; y++){
        rectsVert.push(new THREE.Mesh(rectGeo, rectMat));
        rectsHori.push(new THREE.Mesh(rectGeo2, rectMat));
    }
    
    for(let k = 0; k < rectsVert.length; k++){
        rectsVert[k].scale.y = 300;
        rectsVert[k].position.x = -110+(10*k);
        rectsVert[k].position.z = -75;
        rectsVert[k].position.y = -480;
        scene.add(rectsVert[k]);

        rectsHori[k].scale.x = 180;
        rectsHori[k].position.x = -1500;
        rectsHori[k].position.z = -75;
        rectsHori[k].position.y = -110+(10*k);

        scene.add(rectsHori[k]);
    }

    //const controls = new OrbitControls(camera, renderer.domElement);

    //+++++++++++++++++++++++++
    // Animation setup
    //+++++++++++++++++++++++++
    let acceleration = 1;
    let delta;
    const clock = new THREE.Clock;
    const animate = (fbxObjects) => {

        tempBox.rotation.x += 0.01;
        tempBox.rotation.y += 0.015;

        delta = clock.getDelta();
        if (fbxObjects) {
            fbxObjects.artMixer.update(delta);
            fbxObjects.artGroup.rotation.y += 0.005;
        };

        // animating the background grid rectangles
        for(let j = 0; j < rectsVert.length; j++){
            
            if(rectsVert[j].position.y < 275){
                rectsVert[j].scale.y -= 0.35;
                rectsVert[j].position.y += 2;

                rectsHori[j].scale.x -= 0.2;
                rectsHori[j].position.x += 5.5+(acceleration);

                if(rectsHori[j].position.x > - 200){
                    acceleration -= 0.004;
                }
                if (acceleration <= 0.1){
                    acceleration = 0.1;
                }
            } else {
                acceleration = 1;
                rectsVert[j].scale.y = 300;
                rectsVert[j].position.x = -110+(10*j);
                rectsVert[j].position.z = -75;
                rectsVert[j].position.y = -480;

                rectsHori[j].scale.x = 180;
                rectsHori[j].position.x = -1500;
                rectsHori[j].position.z = -75;
                rectsHori[j].position.y = -110+(10*j);
            }
        }

        // animating the background cubes
        for(let i = 0; i < 600/(quality*2); i++){

            if(i%2 === 0){
                cubeArray[i].rotation.x += 0.02;
                cubeArray[i].position.y += 0.02;
            } else {
                cubeArray[i].rotation.x -= 0.02;
                cubeArray[i].position.y += 0.03;
            }
            
            if(cubeArray[i].position.y > 80){
                cubeArray[i].position.y = -80;
            }
        }

        //controls.update();

        renderer.render( scene, camera );

        requestAnimationFrame(() => animate(fbxObjects));
    }
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}

export const setupHomePageLights = ( scene ) => {
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set( -1, 2, 4 );
    scene.add( dirLight );

    // Directional light helper (temp af)
    const helpDirLight = new THREE.DirectionalLightHelper( dirLight );
    //scene.add( helpDirLight );

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x232323, 1);
    scene.add( hemiLight );
}

const scrollFadeAnimations = ( currentScrollPos ) => {

    //console.log(`current scroll position: `, currentScrollPos);

    const first = document.getElementById('first');
    const second = document.getElementById('second');
    const third = document.getElementById('third');
    const fourth = document.getElementById('fourth');

    if (currentScrollPos >= -45){
        first.classList.remove('fade-out');
        if (first.classList.contains('fade-in') === false){
            first.classList.add('fade-in');
        }    
    } else if( currentScrollPos < -45 && currentScrollPos >= -450 ){
        first.classList.remove('fade-in');
        if (first.classList.contains('fade-out') === false){
            first.classList.add('fade-out');
        }

        second.classList.remove('fade-in');
        if (second.classList.contains('fade-out') === false){
            second.classList.add('fade-out');
        }
    } else if( currentScrollPos < -450 && currentScrollPos >= -700 ){
        second.classList.remove('fade-out');
        if (second.classList.contains('fade-in') === false){
            second.classList.add('fade-in');
        }  
    } else if( currentScrollPos < -700 && currentScrollPos >= -1050 ){
        second.classList.remove('fade-in');
        if (second.classList.contains('fade-out') === false){
            second.classList.add('fade-out');
        }

        third.classList.remove('fade-in');
        if (third.classList.contains('fade-out') === false){
            third.classList.add('fade-out');
        }
    } else if( currentScrollPos < -1050 && currentScrollPos >= -1350 ){
        third.classList.remove('fade-out');
        if (third.classList.contains('fade-in') === false){
            third.classList.add('fade-in');
        } 
    } else if( currentScrollPos < -1350 && currentScrollPos >= -1550 ){
        third.classList.remove('fade-in');
        if (third.classList.contains('fade-out') === false){
            third.classList.add('fade-out');
        } 

        fourth.classList.remove('fade-in');
        if (fourth.classList.contains('fade-out') === false){
            fourth.classList.add('fade-out');
        } 
    } else if( currentScrollPos < -1550 && currentScrollPos >= -2000 ){
        fourth.classList.remove('fade-out');
        if (fourth.classList.contains('fade-in') === false){
            fourth.classList.add('fade-in');
        } 
    } else if( currentScrollPos < -2000 ){
        fourth.classList.remove('fade-in');
        if (fourth.classList.contains('fade-out') === false){
            fourth.classList.add('fade-out');
        } 
    }
}