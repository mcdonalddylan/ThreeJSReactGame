import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '..';
import { setupLights } from './HomePageFunctions';
import { WEBGL } from './WebGL';
import chevWeb from '../assets/chevron svgs/chevWeb.svg';
import { ArtworkContainer } from './ArtworkContainer';
import './HomePage.scss';

import garticImg1 from '../assets/art images/gartic/album_2022-02-12_00-14-22_fast.gif';
import garticImg2 from '../assets/art images/gartic/album_2022-02-12_00-14-22.gif';

import realImg1 from '../assets/art images/realArt/IMG_0996_edited.jpg';
import realImg2 from '../assets/art images/realArt/IMG_1024_edited.jpg';
import realImg3 from '../assets/art images/realArt/PrideCharcoal.jpg';

import charImg1 from '../assets/art images/characterDesigns/TP_Character_Model_Sheet.jpg';
import charImg2 from '../assets/art images/characterDesigns/model_sheet_final_v2.jpg';
import charImg3 from '../assets/art images/characterDesigns/model_sheet_hybrid_v3.jpg';

import inkImg1 from '../assets/art images/creatureDesigns/3D Bug Thang.jpg';
import inkImg2 from '../assets/art images/creatureDesigns/Basalisk.jpg';
import inkImg3 from '../assets/art images/creatureDesigns/Cerberus.jpg';
import inkImg4 from '../assets/art images/creatureDesigns/Chameleon Dude.jpg';
import inkImg5 from '../assets/art images/creatureDesigns/Dragon.jpg';
import inkImg6 from '../assets/art images/creatureDesigns/Elemental.jpg';
import inkImg7 from '../assets/art images/creatureDesigns/Kelpie.jpg';
import inkImg8 from '../assets/art images/creatureDesigns/Mech.jpg';
import inkImg9 from '../assets/art images/creatureDesigns/Plant Monster.jpg';
import inkImg10 from '../assets/art images/creatureDesigns/Siren.jpg';

import { addingWebFBXFile } from './AddingFBXFilesToScene';

export const ThreeJSArtPage: React.FC = () => {
    
    // Colors
    const mainColor = '#e8ed47';
    const bgColor = '#5a5c27';

    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [refresh, setRefresh] = useState(false);
    const [isMobileAspectRatio, setIsMobileAspectRatio] = useState(false);

    useEffect(()=>{
        if (WEBGL.isWebGLAvailable()){

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio/quality );

        if(window.innerHeight > window.innerWidth && !isMobileAspectRatio) {
            setIsMobileAspectRatio(true);
        } else if (window.innerHeight <= window.innerWidth && isMobileAspectRatio) {
            setIsMobileAspectRatio(false);
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
            renderer.setSize( window.innerWidth, window.innerHeight);
            setRefresh(!refresh);
        };

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);

        // Light setup
        setupLights( scene );

        const clock = new THREE.Clock;
        const animate = (fbxObject?: any) => {
            if (fbxObject) {
                const delta = clock.getDelta();
                fbxObject.webMixer.update(delta);

                if (fbxObject.webGroup.rotation.y >= 359 ){
                    fbxObject.webGroup.rotation.y = 0;
                    fbxObject.webGroup.rotation.y += 0.003;
                } else {
                    fbxObject.webGroup.rotation.y += 0.003;
                }
            }

            renderer.render( scene, camera );

            requestAnimationFrame(() => animate(fbxObject));
        }
        
        //let fbxObject: any;
        let webMat = new THREE.MeshPhongMaterial({
            color: bgColor,
        });
        addingWebFBXFile(scene, renderer, camera, webMat, animate);

        //set to top of page when first entering page
        window.scrollTo(0,0);

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    }, [refresh, isMobileAspectRatio]);
    
    return(
        <div className='container position-absolute' style={{right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>
            
            <div className='row justify-content-center'>
                <div className='col-12-xm'>
                    <h1 className='page-title'
                        style={{
                            color: mainColor,
                            textShadow: `0 0 4px ${mainColor}`
                        }}
                    >
                        Art Projects:
                    </h1>
                </div>
            </div>

            <div className='row justify-content-center'>
                <ArtworkContainer
                    key={'gartic'}
                    chevronImgSrc={chevWeb}
                    color={mainColor}
                    bgColor={bgColor}
                    year={'2022'}
                    title={'Gartic Fun Times'}
                    mobileAspectRatio={isMobileAspectRatio}
                    content={(
                        <>
                            <p style={{color: 'white'}}>
                                Just random gartic goodness with friends. All art shown is my own.
                            </p>
                        </>
                    )}
                    contentImgs={[
                        garticImg2,
                        garticImg1
                    ]}               
                />

                <ArtworkContainer
                    key={'charcoal'}
                    chevronImgSrc={chevWeb}
                    color={mainColor}
                    bgColor={bgColor}
                    year={'2019'}
                    title={'Charcoal Drawings'}
                    mobileAspectRatio={isMobileAspectRatio}
                    content={(
                        <>
                            <p style={{color: 'white'}}>
                                College artwork from my Contemporary Concepts in Drawing class.
                            </p>
                        </>
                    )}
                    contentImgs={[
                        realImg1,
                        realImg2,
                        realImg3
                    ]}       
                />

                <ArtworkContainer
                    key={'character designs'}
                    chevronImgSrc={chevWeb}
                    color={mainColor}
                    bgColor={bgColor}
                    year={'2017'}
                    title={'Character Designs'}
                    mobileAspectRatio={isMobileAspectRatio}
                    content={(
                        <>
                            <p style={{color: 'white'}}>
                                Model Sheets for charcters I planned on using for animations / games in the near future.
                            </p>
                        </>
                    )}
                    contentImgs={[
                        charImg2,
                        charImg1,
                        charImg3
                    ]}                   
                />

                <ArtworkContainer
                    key={'inkTober'}
                    chevronImgSrc={chevWeb}
                    color={mainColor}
                    bgColor={bgColor}
                    year={'2017'}
                    title={'Inktober 2017'}
                    mobileAspectRatio={isMobileAspectRatio}
                    content={(
                        <>
                            <p style={{color: 'white'}}>
                                My favorite creature designs from the Inktober 2017 creature list.
                            </p>
                        </>
                    )}
                    contentImgs={[
                        inkImg10,
                        inkImg2,
                        inkImg3,
                        inkImg4,
                        inkImg5,
                        inkImg6,
                        inkImg7,
                        inkImg8,
                        inkImg9,
                        inkImg1
                    ]}              
                />
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
            
        </div>
    )
}