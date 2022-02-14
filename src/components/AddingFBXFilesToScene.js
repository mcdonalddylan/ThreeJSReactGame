import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import artGeo from '../assets/models/art_ani.fbx';

export const addingWebFBXFile = (scene, renderer, camera, material, animate) => {
    let fbxObject = {};
    let webGroup;
    let webMixer;

    const loader = new FBXLoader();

    loader.load(artGeo, (fbx) => {

        webGroup = fbx;

        webGroup.traverse((obj) => {
            if (obj.name === 'Cube' || obj.name === 'Cylinder') {
                obj.material = material;
            }
        });

        webGroup.scale.set( 0.003, 0.003, 0.003 );
        new THREE.Box3().setFromObject( webGroup ).getCenter( webGroup.position ).multiplyScalar( -1 ); 
        webGroup.position.set( 0, -2, -5 );

        webMixer = new THREE.AnimationMixer(webGroup);
        if (webGroup.animations.length > 0) {
            webMixer.clipAction( webGroup.animations[0] ).play();
        };

        scene.add( webGroup );

        renderer.render( scene, camera );
        fbxObject.webGroup = webGroup;
        fbxObject.webMixer = webMixer;
    
        animate(fbxObject);

        console.log('fbxObject', fbxObject);
        const rotateObject = () => {

            const currentScrollPos = document.body.getBoundingClientRect().top;
    
            if (fbxObject) {
                fbxObject.webGroup.rotation.x = currentScrollPos * 0.01;
            }
        }
        document.body.onscroll = rotateObject;

    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });

}