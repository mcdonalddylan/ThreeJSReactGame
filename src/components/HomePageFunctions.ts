import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupObjects = ( scene: THREE.Scene, renderer: THREE.Renderer, 
    camera: THREE.Camera, quality: any, mobileAspectRatio: boolean ) => {

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
    let boxMat = new THREE.MeshPhongMaterial({
        color: 0x44ff22,
    });
    let tempBox = new THREE.Mesh( boxGeo, boxMat );
    tempBox.position.set( boxXPos, -0.9, -5.5 );

    let planeGeo = new THREE.PlaneGeometry( planeSize, planeSize, 1 );
    let tempPlane = new THREE.Mesh( planeGeo, boxMat );
    tempPlane.position.set( planeXPos, -0.9, -5.5 );

    scene.add( tempBox );
    scene.add( tempPlane );

    // Input setup
    const moveCamera = () => {

        const currentScrollPos = document.body.getBoundingClientRect().top;

        camera.rotation.y = currentScrollPos * -0.0018;
        camera.position.z = currentScrollPos * -0.005;
        camera.position.x = currentScrollPos * -0.01;
        camera.position.y = currentScrollPos * 0.005;

        scrollFadeAnimations(currentScrollPos);
    }

    document.body.onscroll = moveCamera;

    // Adding a bunch of random green cubes everywhere
    const addCube = (): THREE.Mesh => {
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

    let cubeArray: THREE.Mesh[] = [];
    for(let i = 0; i < 600/(quality*2); i++){
        cubeArray.push(addCube());
    }

    // Adding background grid animation
    const rectGeo = new THREE.BoxGeometry( 0.3,0.3,0.3 );
    const rectGeo2 = new THREE.BoxGeometry( 0.3,0.3,0.3 );
    const rectMat = new THREE.MeshBasicMaterial({
        color: 0x007700,
    });
    const rectsVert: THREE.Mesh[] = [
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat),
        new THREE.Mesh(rectGeo, rectMat), new THREE.Mesh(rectGeo, rectMat)
    ];
    const rectsHori: THREE.Mesh[] = [
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat),
        new THREE.Mesh(rectGeo2, rectMat), new THREE.Mesh(rectGeo2, rectMat)
    ];
    
    for(let k = 0; k < rectsVert.length; k++){
        rectsVert[k].scale.y = 300;
        rectsVert[k].position.x = -110+(10*k);
        rectsVert[k].position.z = -75;
        rectsVert[k].position.y = -480;
        scene.add(rectsVert[k]);

        rectsHori[k].scale.x = 170;
        rectsHori[k].position.x = -1500;
        rectsHori[k].position.z = -75;
        rectsHori[k].position.y = -110+(10*k);

        scene.add(rectsHori[k]);
    }

    // Animation setup
    let acceleration = 1;
    const animate = () => {
        requestAnimationFrame( animate );

        tempBox.rotation.x += 0.01;
        tempBox.rotation.y += 0.015;

        // animating the background grid rectangles
        for(let j = 0; j < rectsVert.length; j++){
            
            if(rectsVert[j].position.y < 100){
                rectsVert[j].scale.y -= 0.35;
                rectsVert[j].position.y += 2;

                rectsHori[j].scale.x -= 0.2;
                rectsHori[j].position.x += 5.5+(acceleration);

                if(rectsHori[j].position.x > - 200){
                    acceleration -= 0.004;
                } else if (acceleration <= 0.1){
                    acceleration = 0.1;
                }
            } else {
                acceleration = 1;
                rectsVert[j].scale.y = 300;
                rectsVert[j].position.x = -110+(10*j);
                rectsVert[j].position.z = -75;
                rectsVert[j].position.y = -480;

                rectsHori[j].scale.x = 170;
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

        renderer.render( scene, camera );
    }

    animate();

}

export const setupLights = ( scene: THREE.Scene ) => {
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set( -1, 2, 4 );
    scene.add( dirLight );

    // Directional light helper (temp af)
    const helpDirLight = new THREE.DirectionalLightHelper( dirLight );
    //scene.add( helpDirLight );

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x232323, 1);
    scene.add( hemiLight );
}

const scrollFadeAnimations = (currentScrollPos: number) => {

    console.log(`current scroll position: `, currentScrollPos);

    const first = document.getElementById('first');
    const second = document.getElementById('second');
    const third = document.getElementById('third');
    const fourth = document.getElementById('fourth');

    if (currentScrollPos >= -45){
        first?.classList.remove('fade-out');
        if (first?.classList.contains('fade-in') === false){
            first?.classList.add('fade-in');
        }    
    } else if( currentScrollPos < -45 && currentScrollPos >= -450 ){
        first?.classList.remove('fade-in');
        if (first?.classList.contains('fade-out') === false){
            first?.classList.add('fade-out');
        }

        second?.classList.remove('fade-in');
        if (second?.classList.contains('fade-out') === false){
            second?.classList.add('fade-out');
        }
    } else if( currentScrollPos < -450 && currentScrollPos >= -700 ){
        second?.classList.remove('fade-out');
        if (second?.classList.contains('fade-in') === false){
            second?.classList.add('fade-in');
        }  
    } else if( currentScrollPos < -700 && currentScrollPos >= -1100 ){
        second?.classList.remove('fade-in');
        if (second?.classList.contains('fade-out') === false){
            second?.classList.add('fade-out');
        }

        third?.classList.remove('fade-in');
        if (third?.classList.contains('fade-out') === false){
            third?.classList.add('fade-out');
        }
    } else if( currentScrollPos < -1100 && currentScrollPos >= -1300 ){
        third?.classList.remove('fade-out');
        if (third?.classList.contains('fade-in') === false){
            third?.classList.add('fade-in');
        } 
    } else if( currentScrollPos < -1300 && currentScrollPos >= -1650 ){
        third?.classList.remove('fade-in');
        if (third?.classList.contains('fade-out') === false){
            third?.classList.add('fade-out');
        } 

        fourth?.classList.remove('fade-in');
        if (fourth?.classList.contains('fade-out') === false){
            fourth?.classList.add('fade-out');
        } 
    } else if( currentScrollPos < -1650 && currentScrollPos >= -2000 ){
        fourth?.classList.remove('fade-out');
        if (fourth?.classList.contains('fade-in') === false){
            fourth?.classList.add('fade-in');
        } 
    } else if( currentScrollPos < -2000 ){
        fourth?.classList.remove('fade-in');
        if (fourth?.classList.contains('fade-out') === false){
            fourth?.classList.add('fade-out');
        } 
    }
}