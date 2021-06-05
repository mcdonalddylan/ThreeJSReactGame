import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupObjects = ( scene: THREE.Scene, renderer: THREE.Renderer, 
    camera: THREE.Camera, quality: any, mobileAspectRatio: boolean ) => {

    let boxXPos = 0, planeXPos = 0, boxSize = 0, planeSize = 0;
    if(mobileAspectRatio === false){
        boxXPos = -1;
        planeXPos = 1;
    } else {
        boxXPos = -0.5;
        planeXPos = 0.5;
    }
    let boxGeo = new THREE.BoxGeometry( 0.7, 0.7, 0.7);
    let boxMat = new THREE.MeshPhongMaterial({
        color: 0x44ff22,
    });
    let tempBox = new THREE.Mesh( boxGeo, boxMat );
    tempBox.position.set( boxXPos, -0.9, -5.5 );

    let planeGeo = new THREE.PlaneGeometry( 0.9, 0.9, 1);
    let tempPlane = new THREE.Mesh( planeGeo, boxMat );
    tempPlane.position.set( planeXPos, -0.9, -5.5 );

    scene.add( tempBox );
    scene.add( tempPlane );

    // Input setup
    //const orbitControls = new OrbitControls( camera, renderer.domElement );

    const moveCamera = () => {

        const currentScrollPos = document.body.getBoundingClientRect().top;
        camera.position.z = currentScrollPos * -0.03;
        camera.rotation.y = currentScrollPos * -0.002;
        camera.position.x = currentScrollPos * -0.01;
        camera.position.y = currentScrollPos * 0.01;
    }

    document.body.onscroll = moveCamera;

    // Adding a bunch of random green cubes everywhere
    const addCube = (): THREE.Mesh => {
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x004400,
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

    // Animation setup
    const animateBox = () => {
        requestAnimationFrame( animateBox );
        
        // if (resizeRendererToDisplaySize(renderer)){
        //     setRefresh(!refresh);
        // }

        tempBox.rotation.x += 0.01;
        tempBox.rotation.y += 0.015;

        // animating the plane
        // let direction = 1;
        // tempPlane.rotation.y += 0.01 * direction;
        // if (tempPlane.rotation.y > 0.5) {
        //     direction = -1;
        // } else if (tempPlane.rotation.y < -0.5) {
        //     direction = 1;
        // }
        // console.log(tempPlane.rotation.y);
        // console.log(direction);
        // console.log(0.01 * direction);

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

        //orbitControls.update();
        //console.log(`camera x: `, camera.position.x,`y: `, camera.position.y,`z: `, camera.position.z,);
        //console.log(`box x: `, tempBox.position.x,`y: `, tempBox.position.y,`z: `, tempBox.position.z,);

        renderer.render( scene, camera );
    }

    animateBox();

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