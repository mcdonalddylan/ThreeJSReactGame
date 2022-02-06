import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import artGeo from '../assets/models/art_ani.fbx';

export const addingFBXFilesToHomeScene = (scene, renderer, camera, greenMat) => {

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
        // artGroup.position.set( 19, -12.25, -3 );
        artGroup.position.set(0,0,-5);
        artGroup.rotation.set( 0, 1, 0 );

        artMixer = new THREE.AnimationMixer(artGroup);
        if (artGroup.animations.length > 0) {
            artMixer.clipAction( artGroup.animations[0] ).play();
        };
        console.log('artMixer animation inside: ', artMixer.getRoot());

        scene.add( artGroup );
        // scene.children.forEach((sceneObj, ind) => {
        //     console.log(ind, ': ', sceneObj);
        // });

        renderer.render( scene, camera );
    }, () => {},
    (error) => {
        console.log('***', error, '***');
    });

    return {
        artMixer,
        artGroup
    };

}