import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import artGeo from '../../assets/models/artPallete.fbx';
import gameGeo from '../../assets/models/genericControllerCordless.fbx';
import webGeo from '../../assets/models/webCrtMonitorNoMouse.fbx';

export const addingArtFBXFile = (scene, renderer, camera, material, shinyMaterial, animate) => {

    let fbxObject = {};
    let fbxGroup;
    let fbxMixer;

    const loader = new FBXLoader();

    loader.load(artGeo, (fbx) => {

        fbxGroup = fbx;

        fbxGroup.traverse((obj) => {
            if (obj.name.includes('Paint')) {
                obj.material = shinyMaterial;
            }
            else {
                obj.material = material;
            }
        });

        fbxGroup.scale.set( 0.003, 0.003, 0.003 );
        new THREE.Box3().setFromObject( fbxGroup ).getCenter( fbxGroup.position ).multiplyScalar( -1 ); 
        fbxGroup.position.set( 0, 0, -2 );
        fbxGroup.rotation.set(-0.4, 0, 0);

        fbxMixer = new THREE.AnimationMixer(fbxGroup);
        if (fbxGroup.animations.length > 0) {
            fbxMixer.clipAction( fbxGroup.animations[0] ).play();
            fbxMixer.clipAction( fbxGroup.animations[2] ).play();
        };

        scene.add( fbxGroup );

        renderer.render( scene, camera );
        fbxObject.fbxGroup = fbxGroup;
        fbxObject.fbxMixer = fbxMixer;

        animate(fbxObject);
        
    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });
}

export const addingGameFBXFile = (scene, renderer, camera, material, shinyMaterial, animate) => {

    const loader = new FBXLoader();

    loader.load(gameGeo, (fbx) => {
        const fbxObject = {};
        const fbxGroup = fbx;

        fbxGroup.traverse((obj) => {
            if (obj.name.includes('Button') || obj.name === 'DPad' || obj.name === 'RTrigger' || obj.name === 'LTrigger') {
                obj.material = shinyMaterial;
            }
            else {
                obj.material = material;
            }
        });

        fbxGroup.scale.set( 0.003, 0.003, 0.003 );
        new THREE.Box3().setFromObject( fbxGroup ).getCenter( fbxGroup.position ).multiplyScalar( -1 ); 
        fbxGroup.position.set( 0, 0, -2.5 );

        const fbxMixer = new THREE.AnimationMixer(fbxGroup);
        if (fbxGroup.animations.length > 0) {
            fbxMixer.clipAction( fbxGroup.animations[0] ).play();
        };

        scene.add( fbxGroup );

        renderer.render( scene, camera );
        fbxObject.fbxGroup = fbxGroup;
        fbxObject.fbxMixer = fbxMixer;

        animate(fbxObject);
        
    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });
}

export const addingWebFBXFile = (scene, renderer, camera, material, shinyMaterial, animate) => {

    const loader = new FBXLoader();

    loader.load(webGeo, (fbx) => {
        const fbxObject = {};
        const fbxGroup = fbx;

        fbxGroup.traverse((obj) => {
            if (obj.name === 'Cursor') {
                obj.material = material;
            }
            else {
                obj.material = shinyMaterial;
            }
        });

        fbxGroup.scale.set( 0.0035, 0.0035, 0.0035 );
        new THREE.Box3().setFromObject( fbxGroup ).getCenter( fbxGroup.position ).multiplyScalar( -1 ); 
        fbxGroup.position.set( 0, 0, -2.5 );

        const fbxMixer = new THREE.AnimationMixer(fbxGroup);
        if (fbxGroup.animations.length > 0) {
            //fbxMixer.clipAction( fbxGroup.animations[0] ).play();
        };

        scene.add( fbxGroup );

        renderer.render( scene, camera );
        fbxObject.fbxGroup = fbxGroup;
        fbxObject.fbxMixer = fbxMixer;

        animate(fbxObject);
        
    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });
}