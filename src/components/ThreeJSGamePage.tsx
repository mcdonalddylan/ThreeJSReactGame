import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '..';
import { setupLights } from './HomePageFunctions';
import { WEBGL } from './WebGL';
import chevWeb from '../assets/chevron svgs/chevWeb.svg';
import { WorkContainer } from './WorkContainer';
import './HomePage.scss';

import eraseImg1 from '../assets/game images/erase/6T_Eh7.png';
import eraseImg2 from '../assets/game images/erase/B_V_rP.png';
import eraseImg3 from '../assets/game images/erase/eCZmDz.png';
import eraseImg4 from '../assets/game images/erase/fFBevO.png';
import eraseImg5 from '../assets/game images/erase/gRc+xB.gif';
import eraseImg6 from '../assets/game images/erase/Mp8aZ+.png';
import eraseImg7 from '../assets/game images/erase/X+eiQQ.png';

import balloonImg1 from '../assets/game images/balloon/screenshot01.jpg';
import balloonImg2 from '../assets/game images/balloon/screenshot02.jpg';
import balloonImg3 from '../assets/game images/balloon/screenshot03.jpg';
import balloonImg4 from '../assets/game images/balloon/screenshot04.jpg';
import balloonImg5 from '../assets/game images/balloon/screenshot05.jpg';
import balloonImg6 from '../assets/game images/balloon/screenshot06.jpg';

import treeImg1 from '../assets/game images/treeHugVR/goodpic01.png';
import treeImg2 from '../assets/game images/treeHugVR/goodpic02-1.png';
import treeImg3 from '../assets/game images/treeHugVR/goodpic03-1.png';
import treeImg4 from '../assets/game images/treeHugVR/island2_icon_v2.jpg';
import treeImg5 from '../assets/game images/treeHugVR/sc3.jpg';
import treeImg6 from '../assets/game images/treeHugVR/sc4.jpg';
import treeImg7 from '../assets/game images/treeHugVR/sc5.jpg';
import treeImg8 from '../assets/game images/treeHugVR/sc7.jpg';
import treeImg9 from '../assets/game images/treeHugVR/sc8.jpg';
import treeImg10 from '../assets/game images/treeHugVR/screenshot01.png';
import treePdf from '../assets/game images/treeHugVR/tree-hugging-sim-gdd-dylan-mcdonald_version3.pdf';

import coolImg1 from '../assets/game images/coolTitle/cooltitlescreen01.jpg';
import coolImg2 from '../assets/game images/coolTitle/cooltitlescreen02.jpg';
import coolImg3 from '../assets/game images/coolTitle/cooltitlescreen03.jpg';
import coolImg4 from '../assets/game images/coolTitle/cooltitlescreen04.jpg';
import coolImg5 from '../assets/game images/coolTitle/cooltitlescreen05.jpg';
import coolImg6 from '../assets/game images/coolTitle/cooltitlescreen06.jpg';

import recImg1 from '../assets/game images/square/avoidrect01.jpg';
import recImg2 from '../assets/game images/square/avoidrect02.jpg';
import recImg3 from '../assets/game images/square/avoidrect03.jpg';
import recImg4 from '../assets/game images/square/avoidrect04.jpg';
import recImg5 from '../assets/game images/square/avoidrect05.jpg';
import recImg6 from '../assets/game images/square/avoidrect06.jpg';
import recImg7 from '../assets/game images/square/avoidrect07.jpg';

import tafImg1 from '../assets/game images/taffyPilot/taffy-pilot-menu-concept.png';
import tafImg2 from '../assets/game images/taffyPilot/taffy-pilot-in-dick-land-in-game.gif';
import tafImg3 from '../assets/game images/taffyPilot/taffy-pilot-in-dick-land-menu.gif';
import tafPdf from '../assets/game images/taffyPilot/taffy-pilot-in-dl-gdd-dylan-mcdonald.pdf';

import { addingWebFBXFile } from './AddingFBXFilesToScene';

export const ThreeJGamePage: React.FC = () => {
    
    // Colors
    const mainColor = '#f27e8c';
    const bgColor = '#301c1e';

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
    })
    
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
                        Game Projects:
                    </h1>
                </div>
            </div>

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2021'
                title='E.R.A.S.E.'
                contentLinks={[
                    {
                        linkText: 'Link to download latest version',
                        linkUrl: 'https://tobynboudreaux.itch.io/erase'
                    },
                    {
                        linkText: 'Itch.io page',
                        linkUrl: 'https://tobynboudreaux.itch.io/erase'
                    }
                ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            This is a boss-battle driven third-person shooter game made using the Godot game engine. 
                            This game was submitted to the Mech Jam II game jam on October 6th 2021.
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            My contributions:
                        </p>
                        <ul>
                            <li style={{color: 'white'}}>
                                The UI art, programming, animations.
                            </li>
                            <li style={{color: 'white'}}>
                                Fixed bugs with AI and character movement.
                            </li>
                            <li style={{color: 'white'}}>
                                Created scene manager script for transitions between levels.
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    eraseImg7,
                    eraseImg2,
                    eraseImg3,
                    eraseImg4,
                    eraseImg5,
                    eraseImg6,
                    eraseImg1
                ]}
                playAbility='Download'
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2020'
                title='Balloons Attack!'
                contentLinks={[
                    {
                        linkText: 'Play this game now!',
                        linkUrl: 'https://simmer.io/@DylanMcD/balloonsattack'
                    }
                ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            {'The '} 
                            <a href='https://itch.io/jam/2-buttons-jam-2019'>2-Button itchio game jam</a>
                            {' '}heavily inspired this game. 
                            Unfortunately I was finishing up my last semester of college while that jam was going on, 
                            but that didn’t stop me from cooking up ideas.</p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            My contributions:
                        </p>
                        <ul>
                            <li style={{color: 'white'}}>
                                Character customization.
                            </li>
                            <li style={{color: 'white'}}>
                                Level transitions.
                            </li>
                            <li style={{color: 'white'}}>
                                Configurable video settings menu.
                            </li>
                            <li style={{color: 'white'}}>
                                Singletons (game manager).
                            </li>
                            <li style={{color: 'white'}}>
                                Enemy Ai, etc.
                            </li>
                        </ul>
                        <p style={{color: 'white'}}>
                            Almost one month after graduating I finally release version 1.0. 
                            My goal here was to see if I could create a simple but fun-to-play game with a complete story mode, 
                            all within one month. 
                            I’ve never attempted something like this prior, 
                            so I was pleased to see that I managed to stick to my production schedule despite also working a full-time job.
                        </p>
                    </>
                )}
                contentImgs={[
                    balloonImg1,
                    balloonImg2,
                    balloonImg3,
                    balloonImg4,
                    balloonImg5,
                    balloonImg6
                ]}
                playAbility='Playable'
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Tree Hugging Simulator VR'
                contentLinks={
                    [
                        {
                            linkText: 'Link to download v1.2 (Windows 10+ & Steam VR required)',
                            linkUrl: 'https://drive.google.com/open?id=1oGUvlfgjy9r_wrXGyQoIrEPOSK4PgzEb'
                        },
                        {
                            linkText: 'View Game Design Document',
                            linkUrl: treePdf
                        }
                    ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            A Unity Engine VR game whereby the player must save the world; one tree hug at a time. 
                            Not every tree consents to being hugged however. 
                            Fortunately in this bizarre game you can fire a “money-shot” at nasty objects that may be bothering the tree. 
                            Ahhhh, if only the solution to climate change were actually this easy. That’d be nice.
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            This was my big senior project and the first VR game I had ever made. 
                            There were many hurdles to overcome and countless bugs I had to fix by the end of the semester. 
                            That said, the version you can download now is technically feature complete.
                        </p>
                    </>
                )}
                contentImgs={[
                    treeImg6,
                    treeImg2,
                    treeImg3,
                    treeImg4,
                    treeImg5,
                    treeImg1,
                    treeImg7,
                    treeImg8,
                    treeImg9,
                    treeImg10
                ]}
                playAbility='Download'
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Cool Title - The Game'
                contentLinks={
                    [
                        {
                            linkText: 'Link to download game (Windows 10+ required & CPU intensive)',
                            linkUrl: 'https://drive.google.com/open?id=1bjKYbplmdCy1IiiebXlLO5E1l1DoWkMn'
                        }
                    ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            This was the 2nd game that I coded entirely using Java using the 
                            {' '}<a href='https://processing.org/'>Processing sketch program</a>. 
                            The objective in this game is to form a long video-game title by collecting as many “cool” words as possible. 
                            You control a character using the arrow keys as they collect actual words or fake, made-up words. 
                            All while avoiding the nerdy glasses that are occasionally thrown at you. 
                            If you get hit twice by those glasses it’s game over. 
                            At that point you’re given a low coolness score. 
                            Otherwise you’ll get a much higher score by collecting either 7 or 8 words (depends on the length).
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            I had a lot of fun making this game, but I gotta say that Processing 3.0+ is a program that is definitely not designed to handle 3D games. 
                            It was very challenging to optimize the performance.
                        </p>
                    </>
                )}
                contentImgs={[
                    coolImg1,
                    coolImg2,
                    coolImg3,
                    coolImg4,
                    coolImg5,
                    coolImg6
                ]}
                playAbility='Download'
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Avoid the Rectangles'
                contentLinks={
                    [
                        {
                            linkText: 'Link to download game (Windows 10+ required & CPU intensive)',
                            linkUrl: 'https://drive.google.com/open?id=1t78j5Azp8SKcGDzgIPhLzs3HYjdEduDA'
                        }
                    ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                        This game was coded entirely using Java within the 
                        {' '}<a href='https://processing.org/'>Processing sketch program</a>. 
                        Originally it was an assignment for my Art and Code class, however the version you can download now is a far more complete version with lots of hidden features. 
                        To access these hidden features you can either right click anywhere on the screen or hit the ‘v’ key. 
                        At that point you can left click on the area of your choosing to see how things are altered. 
                        The concept is simple enough, sure, but I tried my best to make this game as challenging as possible. 
                        Good Luck! 😀
                        </p>
                    </>
                )}
                contentImgs={[
                    recImg6,
                    recImg2,
                    recImg3,
                    recImg4,
                    recImg5,
                    recImg1,
                    recImg7
                ]}
                playAbility='Download'
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2018'
                title='Taffy Pilot in Dick Land'
                contentLinks={[
                    {
                        linkText: 'View game design document',
                        linkUrl: tafPdf
                    }
                ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            An Unreal Engine 4 3D platformer where the you control a pudgy little guy who’s been trapped in a virtual world based around crappy social media games. 
                            His goal is to escape this hell by popping dick-shaped balloons that are scattered around 5 different wacky worlds. 
                            For more information, feel free to check out the game design document.
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            My contributions:
                        </p>
                        <ul>
                            <li style={{color: 'white'}}>
                                Using the “Blueprint” system to create a polished main menu.
                            </li>
                            <li style={{color: 'white'}}>
                                Using C++ to both animate and control the playable character.
                            </li>
                            <li style={{color: 'white'}}>
                                Creation of a ton of 3D player animations and other 3D assets.
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    tafImg1,
                    tafImg2,
                    tafImg3
                ]}
                playAbility='Nope'
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