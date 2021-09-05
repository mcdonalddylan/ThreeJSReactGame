import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '..';
import { setupLights } from './HomePageFunctions';
import { WEBGL } from './WebGL';
import fontJson from '../assets/fonts/LieraSans-Bold-msdf.json';
import chevWeb from '../assets/chevron svgs/chevWeb.svg';
import { WorkContainer } from './WorkContainer';
import webImg1 from '../assets/web images/push-up2.0_2.jpg';
import webImg2 from '../assets/web images/FoodGenerator2.jpg';
import webImg3 from '../assets/web images/mochiCircle6.jpg';
import webImg4 from '../assets/web images/foodar1.jpg';

export const ThreeJSWebPage: React.FC = () => {
    
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

        // Light setup
        setupLights( scene );

        let webGeo = new THREE.BoxGeometry( 1, 1, 1 );
        let webMat = new THREE.MeshPhongMaterial({
            color: 0x156289,
        });
        let webMesh = new THREE.Mesh( webGeo, webMat );

        let meshZPos = -2;
        if (mobileAspectRatio){
            meshZPos = -3;
        } else {
            meshZPos = -2;
        }

        webMesh.position.set( 0, -0.1, meshZPos );
        scene.add( webMesh );

        const rotateObject = () => {

            const currentScrollPos = document.body.getBoundingClientRect().top;
    
            webMesh.rotation.x = currentScrollPos * 0.015;
        }
    
        document.body.onscroll = rotateObject;

        // Render function babyyyyy
        renderer.render( scene, camera );

        const animate = () => {
            requestAnimationFrame( animate );

            if (webMesh !== undefined){
                console.log(webMesh.rotation.y%360);
                console.log(webMesh.rotation.y);
                if (webMesh.rotation.y >= 359 ){
                    webMesh.rotation.y = 0;
                    webMesh.rotation.y += 0.003;
                } else {
                    webMesh.rotation.y += 0.003;
                }
            }

            renderer.render( scene, camera );
        }
        animate();

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    })
    
    return(
        <div className='container position-absolute' style={{right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={'#22b5ff'}
                bgColor={'#062432'}
                year='2021'
                title='Bam 2.0'
                content={(
                    <p style={{color: 'white'}}>HCSC project.</p>
                )}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={'#22b5ff'}
                bgColor={'#062432'}
                year='2020'
                title='Client Engagement Portal'
                contentLinks={
                    [
                        {
                            linkText: 'Github front end',
                            linkUrl: ''
                        },
                        {
                            linkText: 'Github back end',
                            linkUrl: ''
                        }
                    ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            Revature enterprise level project.
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            My Role:
                        </p>
                        <ul>
                            <li style={{color: 'white'}}>
                                Do cool stuff
                            </li>
                            <li style={{color: 'white'}}>
                                Continue to do cool stuff
                            </li>
                            <li style={{color: 'white'}}>
                                Excite others
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    webImg1,
                    webImg2,
                    webImg3,
                    webImg4
                ]}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={'#22b5ff'}
                bgColor={'#062432'}
                year='2020'
                title='Mochi Circle'
                content={(
                    <p style={{color: 'white'}}>Revature training project with the boys. check out this link</p>
                )}
            />

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
    )
}