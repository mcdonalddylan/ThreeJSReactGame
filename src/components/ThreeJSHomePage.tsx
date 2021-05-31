import React, { useEffect } from 'react';
import * as THREE from "three";
import { setupLights, setupObjects } from './HomePageFunctions';

interface IProps {

}

export const ThreeJSHomePage: React.FC<IProps> = (props:IProps) => {

    useEffect(()=>{

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio );
        //document.body.appendChild( renderer.domElement );

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        camera.position.y = 0.3;

        // Render function babyyyyy
        renderer.render( scene, camera );

        // Light setup
        setupLights( scene );
        
        // Object placement/animation/inputs
        setupObjects( scene, renderer, camera );

    });

    return(
        <div style={{margin: "0 auto", display: "block"}}>
        </div>
    )
}