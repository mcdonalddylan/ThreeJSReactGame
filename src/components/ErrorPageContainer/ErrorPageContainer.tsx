import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { FontData, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { IState } from '../..';
import { setupHomePageLights } from '../../utils/homePageUtils/homePageUtils';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import textFont from '../../assets/fonts/optimer_bold.typeface.json';

export const ErrorPageContainer: React.FC = () => {
    
    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(()=>{
        if (WEBGL.isWebGLAvailable()){

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio/quality );

        let mobileAspectRatio = false;
        if(window.innerHeight > window.innerWidth) {
            mobileAspectRatio = true;
        } else {
            mobileAspectRatio = false;
        }

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
        
        window.onresize = () => {
            //console.log('You just resized the window');
            renderer.setSize( window.innerWidth, window.innerHeight);
            setRefresh(!refresh);
        };

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.set(0,0,3);

        // Light setup
        setupHomePageLights( scene );

        const loader = new FontLoader();
        let font = loader.parse(textFont);
        const textMat = new THREE.MeshPhongMaterial({
                    color      : 0xff3300,
                    side       : THREE.DoubleSide
                });
        const textGeo = new TextGeometry('ERROR Page', {
                    font: font,
                    size: mobileAspectRatio ? 0.8 : 2,
                    height: 0.2,
                    bevelThickness: 3
                });
        

        const textMesh = new THREE.Mesh( textGeo, textMat );
        textGeo.translate( mobileAspectRatio ? -3.5 : -8.5, 0, 0 );
        textMesh.position.set(0,0,-10);
        textMesh.receiveShadow = true;
        scene.add( textMesh );

        const composer = new EffectComposer( renderer );
        const basicRenderPass = new RenderPass( scene, camera );
        composer.addPass( basicRenderPass );
        if (quality === 1) {
            const bloomPass = new UnrealBloomPass( new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.09, 0.001);
            composer.addPass(bloomPass);
            const fxaaPass = new ShaderPass( FXAAShader );
            composer.addPass(fxaaPass);
        }
        const outputPass = new OutputPass();
        composer.addPass( outputPass );

        const animate = (textMesh: any) => {
            let rotSpeed = 0.007;
            if (textMesh.rotation.y%6.3 > 5.4 && textMesh.rotation.y%6.3 <= 6.3) {
                rotSpeed = 0.007
            } else {
                rotSpeed = 0.07
            }
            textMesh.rotation.y += rotSpeed;
            
            composer.render();
            requestAnimationFrame(() => animate(textMesh) );
        }
        animate(textMesh);

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    })
    
    return(
        <div
            style={{margin: "0 auto", display: "block"}}
            data-testid='error-page-container'>
        </div>
    )
}