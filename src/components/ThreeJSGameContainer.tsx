import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";

interface IProps {

}

export const ThreeJSGameContainer: React.FC<IProps> = () => {

    useEffect(() => {
        // === THREE.JS CODE START ===
        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth , window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // Camera setup
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;
        
        // Cube setup
        let geometry = new THREE.BoxGeometry( 2, 1.5, 1.5 );
        let material = new THREE.MeshPhongMaterial( { 
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
         } );
        let cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        
        
        // Light setup
        let lightIntesity = 1;
        let light = new THREE.DirectionalLight(0xFFFFFF, lightIntesity);
        light.position.set(-1, 2, 4);
        scene.add( light );

        let animate = () => {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        
        animate();
        // === THREE.JS EXAMPLE CODE END ===
    });

    return (
        <>
        </>
    );
}
