import React, { useEffect, useState } from 'react';
import * as THREE from "three";
import { setupLights, setupObjects } from './HomePageFunctions';
import '../components/HomePage.scss';
import { useSelector } from 'react-redux';
import { IState } from '..';
import { WEBGL } from './WebGL';

interface IProps {

}

export const ThreeJSHomePage: React.FC<IProps> = ( props: IProps ) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{

    if ( WEBGL.isWebGLAvailable() ) { 

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
            console.log('You just resized the window');
            renderer.setSize( window.innerWidth, window.innerHeight);
            window.scrollTo(0,0);
            setRefresh(!refresh);
        };

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);

        // Render function babyyyyy
        renderer.render( scene, camera );

        // Light setup
        setupLights( scene );
        
        // Object placement/animation/inputs
        setupObjects( scene, renderer, camera, quality, mobileAspectRatio );

    } else {
        
        const warning = WEBGL.getWebGLErrorMessage();
        document.body.appendChild( warning );
    }

    });

    return(
        <div className="container" style={{transform: `translate(0%)`, position: "absolute", zIndex: 2 }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="row justify-content-center">
                <div className="col-sm-8 text-grid" id="first" >
                    <h1 style={{textAlign: "center", margin: "auto", fontSize: 50}}>
                        Dylan McDonald
                    </h1>
                    <hr style={{width: "70%", textAlign: "center", margin: "auto", marginTop: 20, marginBottom: 10}}></hr>
                    <h3 style={{textAlign: "center", marginBottom: 30}}>
                        React & Java Developer  |  Game Developer
                    </h3>
                    <div className="row justify-content-center" style={{margin: "auto", textAlign: "center"}}>
                        <div className="col-sm-3">
                            Resume
                        </div>
                        <div className="col-sm-3">
                            Linked-in
                        </div>
                        <div className="col-sm-3">
                            Email
                        </div>
                        <div className="col-sm-3">
                            GitHub
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="row justify-content-center">
                <div className="col-sm-8 text-grid" id="second" >
                    <a href='www.google.com' style={{textAlign: "center", margin: "auto", fontSize: 70}}>
                        Check out my web development work!
                    </a>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="row justify-content-center">
                <div className="col-sm-8 text-grid" id="third" >
                    <a href='www.google.com' style={{textAlign: "center", margin: "auto", fontSize: 70}}>
                        Check out my game development work!
                    </a>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="row justify-content-center">
                <div className="col-sm-8 text-grid" id="fourth" >
                    <a href='www.google.com' style={{textAlign: "center", margin: "auto", fontSize: 70}}>
                        Check out my art!
                    </a>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );

}
