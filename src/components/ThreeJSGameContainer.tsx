import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from "three";
import { IState } from '..';

interface IProps {

}

export const ThreeJSGameContainer: React.FC<IProps> = ( props: IProps ) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);

    // Three JS code is all below
    useEffect(() => {
        
        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio/quality );
        
        renderer.domElement.id = 'dom';
        renderer.domElement.className = 'position-fixed';
        if (document.body.contains( document.getElementById( 'dom' ) ) === false) {
            document.body.append( renderer.domElement );
        } else {
            const dom = document.getElementById('dom');
            if(dom !== null) {
                document.body.removeChild( dom );
                document.body.append( renderer.domElement );
            } 
        }

        // Camera setup
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        let scene = new THREE.Scene();

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

        // Input setup


        let animate = () => {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        
        animate();
    });

    return (
        <div style={{margin: "0 auto", display: "block"}}>
        </div>
    );
}
