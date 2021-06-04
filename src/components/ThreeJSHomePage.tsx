import React, { useEffect } from 'react';
import * as THREE from "three";
import { setupLights, setupObjects } from './HomePageFunctions';
import '../components/HomePage.scss';
import { useSelector } from 'react-redux';
import { IState } from '..';

interface IProps {

}

export const ThreeJSHomePage: React.FC<IProps> = ( props: IProps ) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    //console.log(`quality: `, quality);

    useEffect(()=>{

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio/quality );

        renderer.domElement.id = 'dom';
        console.log(document.body.contains( document.getElementById( 'dom' ) ));
        if (document.body.contains( document.getElementById( 'dom' ) ) === false) {
            document.body.append( renderer.domElement );
        } else {
            const dom = document.getElementById('dom');
            if(dom !== null) {
                document.body.removeChild( dom );
                document.body.append( renderer.domElement );
            } 
        }

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
        setupObjects( scene, renderer, camera, quality );

        

    });

    return(
        <></>
    )
}