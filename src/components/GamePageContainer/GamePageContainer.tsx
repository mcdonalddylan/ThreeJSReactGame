import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '../..';
import { setupHomePageLights } from '../../utils/homePageUtils/homePageUtils';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import chevGame from '../../assets/chevronSvgs/chevGame.svg';
import { WorkContainer } from '../WorkContainer/WorkContainer';
import '../HomePageContainer/HomePageContainer.scss';

import sickImg1 from '../../assets/gameImages/sickGame/sickGameMenuUIDemo.gif';
import sickImg2 from '../../assets/gameImages/sickGame/sickGameTimeSlowDemo.gif';

import squareImg1 from '../../assets/gameImages/square/squareStartAndEndDemo.gif';
import squareImg2 from '../../assets/gameImages/square/squareBad.png';
import squareImg3 from '../../assets/gameImages/square/squareGood.png';

import eraseImg1 from '../../assets/gameImages/erase/6T_Eh7.png';
import eraseImg2 from '../../assets/gameImages/erase/B_V_rP.png';
import eraseImg3 from '../../assets/gameImages/erase/eCZmDz.png';
import eraseImg4 from '../../assets/gameImages/erase/fFBevO.png';
import eraseImg5 from '../../assets/gameImages/erase/gRc+xB.gif';
import eraseImg6 from '../../assets/gameImages/erase/Mp8aZ+.png';
import eraseImg7 from '../../assets/gameImages/erase/X+eiQQ.png';
import eraseImg8 from '../../assets/gameImages/erase/inGameUIBugFixes.gif';
import eraseImg9 from '../../assets/gameImages/erase/menuUITransitionDemo.gif';
import eraseImg10 from '../../assets/gameImages/erase/interactMechUIDemo.gif';

import balloonImg1 from '../../assets/gameImages/balloon/screenshot01.jpg';
import balloonImg2 from '../../assets/gameImages/balloon/screenshot02.jpg';
import balloonImg3 from '../../assets/gameImages/balloon/screenshot03.jpg';
import balloonImg4 from '../../assets/gameImages/balloon/screenshot04.jpg';
import balloonImg5 from '../../assets/gameImages/balloon/screenshot05.jpg';
import balloonImg6 from '../../assets/gameImages/balloon/screenshot06.jpg';
import balloonImg7 from '../../assets/gameImages/balloon/balloonCustom.png';

import treeImg1 from '../../assets/gameImages/treeHugVR/goodpic01.png';
import treeImg2 from '../../assets/gameImages/treeHugVR/goodpic02-1.png';
import treeImg3 from '../../assets/gameImages/treeHugVR/goodpic03-1.png';
import treeImg4 from '../../assets/gameImages/treeHugVR/island2_icon_v2.jpg';
import treeImg5 from '../../assets/gameImages/treeHugVR/sc3.jpg';
import treeImg6 from '../../assets/gameImages/treeHugVR/sc4.jpg';
import treeImg7 from '../../assets/gameImages/treeHugVR/sc5.jpg';
import treeImg8 from '../../assets/gameImages/treeHugVR/sc7.jpg';
import treeImg9 from '../../assets/gameImages/treeHugVR/sc8.jpg';
import treeImg10 from '../../assets/gameImages/treeHugVR/screenshot01.png';
import treePdf from '../../assets/gameImages/treeHugVR/tree-hugging-sim-gdd-dylan-mcdonald_version3.pdf';

import coolImg1 from '../../assets/gameImages/coolTitle/cooltitlescreen01.jpg';
import coolImg2 from '../../assets/gameImages/coolTitle/cooltitlescreen02.jpg';
import coolImg3 from '../../assets/gameImages/coolTitle/cooltitlescreen03.jpg';
import coolImg4 from '../../assets/gameImages/coolTitle/cooltitlescreen04.jpg';
import coolImg5 from '../../assets/gameImages/coolTitle/cooltitlescreen05.jpg';
import coolImg6 from '../../assets/gameImages/coolTitle/cooltitlescreen06.jpg';
import coolImg7 from '../../assets/gameImages/coolTitle/coolTitleMenuDemo.gif';

import recImg1 from '../../assets/gameImages/square/avoidrect01.jpg';
import recImg2 from '../../assets/gameImages/square/avoidrect02.jpg';
import recImg3 from '../../assets/gameImages/square/avoidrect03.jpg';
import recImg4 from '../../assets/gameImages/square/avoidrect04.jpg';
import recImg5 from '../../assets/gameImages/square/avoidrect05.jpg';
import recImg6 from '../../assets/gameImages/square/avoidrect06.jpg';
import recImg7 from '../../assets/gameImages/square/avoidrect07.jpg';
import recImg8 from '../../assets/gameImages/square/rectAvoidDemo.gif';
import recImg9 from '../../assets/gameImages/square/rectInvincibleDemo.gif';
import recImg10 from '../../assets/gameImages/square/rectInvertedColorDemo.gif';

import tafImg1 from '../../assets/gameImages/taffyPilot/taffy-pilot-menu-concept.png';
import tafImg2 from '../../assets/gameImages/taffyPilot/taffy-pilot-in-dick-land-in-game.gif';
import tafImg3 from '../../assets/gameImages/taffyPilot/taffy-pilot-in-dick-land-menu.gif';
import tafPdf from '../../assets/gameImages/taffyPilot/taffy-pilot-in-dl-gdd-dylan-mcdonald.pdf';

import { addingGameFBXFile } from '../../utils/fbxUtils/fbxUtils';

export const GamePageContainer: React.FC = () => {

    // Colors
    const mainColor = '#f27e8c';
    const bgColor = '#301c1e';

    const quality: any = useSelector<IState>(state => state.qualityState);
    // const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (WEBGL.isWebGLAvailable()) {

            // Renderer setup
            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio / quality);

            let mobileAspectRatio = false;
            if (window.innerHeight > window.innerWidth) {
                mobileAspectRatio = true;
            } else {
                mobileAspectRatio = false;
            }

            renderer.domElement.id = 'dom';
            renderer.domElement.className = 'position-fixed';
            if (document.body.contains(document.getElementById('dom')) === false) {
                document.body.append(renderer.domElement);
            } else {
                const dom = document.getElementById('dom');
                if (dom !== null) {
                    document.body.removeChild(dom);
                    document.body.append(renderer.domElement);
                }
            }

            // window.onresize = () => {
            //     renderer.setSize(window.innerWidth, window.innerHeight);
            //     setRefresh(!refresh);
            // };

            // Camera / Scene setup
            let scene = new THREE.Scene();
            let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

            // Light setup
            setupHomePageLights(scene);

            // Animating the background 3D model when scrolling up and down
            const clock = new THREE.Clock;
            let direction = 1;
            let speed = 0;
            const INITIAL_SPEED = 0.003;
            const animate = (fbxObject?: any) => {
                if (fbxObject) {
                    const delta = clock.getDelta();
                    fbxObject.fbxMixer.update(delta);
                    const acceleration = -0.0009;

                    if (fbxObject.fbxGroup.rotation.x >= 359 ){
                        fbxObject.fbxGroup.rotation.x = 0;  
                    }

                    speed += acceleration;
                    if (speed <= 0) {
                        speed = 0;
                    }
                    fbxObject.fbxGroup.rotation.x += (INITIAL_SPEED * direction) + (speed * direction);
                }

                renderer.render( scene, camera );

                requestAnimationFrame(() => animate(fbxObject));
            }

            let oldScrollY = window.scrollY;
            const rotateObject = () => {
                speed += 0.003;
                if (speed > 0.3) {
                    speed = 0.3;
                }
                
                if(oldScrollY < window.scrollY){
                    direction = 1;
                } else {
                    direction = -1;
                }
                oldScrollY = window.scrollY;
            }
            window.onscroll = rotateObject;

            // Adding the game contoller 3D model to the page background
            let gameMat = new THREE.MeshPhongMaterial({
                color: bgColor,
                shininess: 0,
                reflectivity: 0
            });
            let gameShinyMat = new THREE.MeshPhongMaterial({
                color: bgColor,
                shininess: 100,
                reflectivity: 1
            });
            addingGameFBXFile(scene, renderer, camera, gameMat, gameShinyMat, animate, mobileAspectRatio);

            //set to top of page when first entering page
            window.scrollTo(0, 0);

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild(warning);
        }
    }, [quality]);

    return (
        <div className='container position-absolute' style={{ right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>

            <div className='row justify-content-center'>
                <div className='col-12-xm'>
                    <h1 className='page-title'
                        style={{
                            textShadow: `0 0 0.3em ${mainColor}`
                        }}>
                        Game Projects:
                    </h1>
                </div>
            </div>

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2022 - Now'
                title='Sick Game'
                contentLinks={[
                    {
                        linkText: 'Github link',
                        linkUrl: 'https://github.com/mcdonalddylan/SickGame'
                    }
                ]}
                content={(
                    <>
                        <p>
                            This game is a heavily movement and platforming-focused 2.5D Metroidvania game.
                            Movement mechanics inspired by Super Smash Brothers Melee.
                        </p>
                        <br></br>
                        <p>
                            Goals with project:
                        </p>
                        <ul>
                            <li>
                                Move Unity progress over to UE5
                            </li>
                            <li>
                                Complete a vertical slice
                            </li>
                            <li>
                                Create an webGL and Android version
                            </li>
                        </ul>
                    </>
                )}
                playAbility='Nope'
                contentImgs={[
                    sickImg1,
                    sickImg2
                ]}
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2022'
                title={'Avoid the Squares!'}
                contentLinks={[
                    {
                        linkText: 'Click here to play!',
                        linkUrl: 'https://mcdonalddylan.github.io/AvoidTheSquares/'
                    },
                    {
                        linkText: 'Github link',
                        linkUrl: 'https://github.com/mcdonalddylan/AvoidTheSquares'
                    },
                ]}
                content={(
                    <>
                        <p>
                            Considering how simple the original "Avoid the Rectangles" game was, I figured it'd be a good way to learn game development using three.js.
                        </p>
                        <br></br>
                        <p>
                            Goals with project:
                        </p>
                        <ul>
                            <li>
                                Complete a vertical slice just for fun :)
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    squareImg2,
                    squareImg1,
                    squareImg3
                ]}
                contentSubtext={[
                    'Lower quality graphics to improve performance on mobile.',
                    'Reimagined this old game using three.js, React, and typescript.',
                    '"Good" quality graphics for desktop users.' 
                ]}
                playAbility='Playable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2021'
                title='E.R.A.S.E.'
                contentLinks={[
                    {
                        linkText: 'Itch.io page',
                        linkUrl: 'https://tobynboudreaux.itch.io/erase'
                    },
                    {
                        linkText: 'Github link',
                        linkUrl: 'https://github.com/tobynboudreaux/MechJamII/tree/post_submission'
                    }
                ]}
                content={(
                    <>
                        <p>
                            This is a boss-battle driven third-person shooter game made using the Godot game engine.
                            This game was submitted to the Mech Jam II game jam on October 6th 2021.
                        </p>
                        <br></br>
                        <p>
                            My contributions:
                        </p>
                        <ul>
                            <li>
                                The UI art, programming, animations.
                            </li>
                            <li>
                                Fixed bugs with AI and character movement.
                            </li>
                            <li>
                                Created scene manager script for transitions between levels.
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    eraseImg8,
                    eraseImg9,
                    eraseImg10,
                    eraseImg7,
                    eraseImg2,
                    eraseImg3,
                    eraseImg4,
                    eraseImg5,
                    eraseImg6,
                    eraseImg1
                ]}
                contentSubtext={[
                    'Implemented the in-game UI code for user & enemy life bars, reloading, and dashing using GDScript. Also added a depth of field effect.',
                    'Coded and did the 2D art for the UI and all UI level transitions using GDScript and Photoshop.',
                    'Added the UI and fixed bugs dealing the ridable mech using GDScript.'
                ]}
                playAbility='Downloadable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2020'
                title='Balloons Attack!'
                contentLinks={[
                    {
                        linkText: 'Click here to play!',
                        linkUrl: 'https://simmer.io/@DylanMcD/balloonsattack'
                    }
                ]}
                content={(
                    <>
                        <p>
                            {'The '}
                            <a href='https://itch.io/jam/2-buttons-jam-2019'>2-Button itchio game jam</a>
                            {' '}heavily inspired this game.
                            Unfortunately I was finishing up my last semester of college while that jam was going on,
                            but that didn’t stop me from cooking up ideas.</p>
                        <br></br>
                        <p>
                            My contributions:
                        </p>
                        <ul>
                            <li>
                                Character customization.
                            </li>
                            <li>
                                Level transitions.
                            </li>
                            <li>
                                Configurable video settings menu.
                            </li>
                            <li>
                                Singletons (game manager).
                            </li>
                            <li>
                                Enemy Ai, etc.
                            </li>
                        </ul>
                        <p >
                            Almost one month after graduating I finally release version 1.0.
                            My goal here was to see if I could create a simple but fun-to-play game with a complete story mode,
                            all within one month.
                            I’ve never attempted something like this prior,
                            so I was pleased to see that I managed to stick to my production schedule despite also working a full-time job.
                        </p>
                    </>
                )}
                contentImgs={[
                    balloonImg5,
                    balloonImg2,
                    balloonImg7,
                    balloonImg4,
                    balloonImg3,
                    balloonImg1,
                    balloonImg6
                ]}
                contentSubtext={[
                    'Implemented a graphics options menu which works as intended in all versions of the game.',
                    'Added an level select area with a cutscene before the first level and after the final level.',
                    'Gave the player the ability to customize the playable character from the main menu.'
                ]}
                playAbility='Playable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Tree Hugging Simulator VR'
                contentLinks={
                    [
                        {
                            linkText: 'Download link (Windows 10+ & Steam VR required)',
                            linkUrl: 'https://drive.google.com/open?id=1oGUvlfgjy9r_wrXGyQoIrEPOSK4PgzEb'
                        },
                        {
                            linkText: 'View game design document',
                            linkUrl: treePdf
                        }
                    ]}
                content={(
                    <>
                        <p>
                            A Unity Engine VR game whereby the player must save the world; one tree hug at a time.
                            Not every tree consents to being hugged however.
                            Fortunately in this bizarre game you can fire a “money-shot” at nasty objects that may be bothering the tree.
                            Ahhhh, if only the solution to climate change were actually this easy. That’d be nice.
                        </p>
                        <br></br>
                        <p>
                            This was my big senior project and the first VR game I had ever made.
                            There were many hurdles to overcome and countless bugs I had to fix by the end of the semester.
                            That said, the version you can download now is technically feature complete.
                        </p>
                    </>
                )}
                contentImgs={[
                    treeImg7,
                    treeImg2,
                    treeImg5,
                    treeImg3,
                    treeImg4,
                    treeImg1,
                    treeImg6,
                    treeImg8,
                    treeImg9,
                    treeImg10
                ]}
                contentSubtext={[
                    'The "hugging" feature was done using a combination of raycasts from each hand and multiple colliders. I created an algorithm to determine whether the hug is "good" or "sick".',
                    'This VR game was playtested my multiple students throughout development.',
                    'Implemented a "money shot" feature to let the player destroy certain objects that are upsetting the trees.'
                ]}
                playAbility='Downloadable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Cool Title - The Game'
                contentLinks={
                    [
                        {
                            linkText: 'Download link (Windows 10+ required & CPU intensive)',
                            linkUrl: 'https://drive.google.com/open?id=1bjKYbplmdCy1IiiebXlLO5E1l1DoWkMn'
                        }
                    ]}
                content={(
                    <>
                        <p>
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
                        <p>
                            I had a lot of fun making this game, but I gotta say that Processing 3.0+ is a program that is definitely not designed to handle 3D games.
                            It was very challenging to optimize the performance.
                        </p>
                    </>
                )}
                contentImgs={[
                    coolImg4,
                    coolImg7,
                    coolImg6,
                    coolImg1,
                    coolImg3,
                    coolImg5,                    
                    coolImg2
                ]}
                contentSubtext={[
                    'Developed an algorithm for determining the "coolness" of the user chosen title.',
                    'I added an easier "baby" difficulty mode after some of the feedback I recieved on the default difficulty.',
                    'The nerd enemies track the player\'s position before throwing their glasses.'
                ]}
                playAbility='Downloadable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
                color={mainColor}
                bgColor={bgColor}
                year='2019'
                title='Avoid the Rectangles'
                contentLinks={
                    [
                        {
                            linkText: 'Download link (Windows 10+ required & CPU intensive)',
                            linkUrl: 'https://drive.google.com/open?id=1t78j5Azp8SKcGDzgIPhLzs3HYjdEduDA'
                        }
                    ]}
                content={(
                    <>
                        <p>
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
                    recImg9,
                    recImg8,
                    recImg10,
                    recImg6,
                    recImg2,
                    recImg3,
                    recImg4,
                    recImg5,
                    recImg1,
                    recImg7
                ]}
                contentSubtext={[
                    'Pressing the "v" key will bring up a secret menu which can alter the game in multiple ways. Including invincibility, size alterations, hard mode and a couple "filters" for fun :D.',
                    'It took a lot of feedback to nail down the default difficulty.',
                    'This "invertion" filter was one of the features I enjoyed coding the most.'
                ]}
                playAbility='Downloadable'
            />

            <WorkContainer
                chevronImgSrc={chevGame}
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
                        <p>
                            An Unreal Engine 4 3D platformer where the you control a pudgy little guy who’s been trapped in a virtual world based around crappy social media games.
                            His goal is to escape this hell by popping dick-shaped balloons that are scattered around 5 different wacky worlds.
                            For more information, feel free to check out the game design document.
                        </p>
                        <br></br>
                        <p>
                            My contributions:
                        </p>
                        <ul>
                            <li>
                                Using the “Blueprint” system to create a polished main menu.
                            </li>
                            <li>
                                Using C++ to both animate and control the playable character.
                            </li>
                            <li>
                                Creation of a ton of 3D player animations and other 3D assets.
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    tafImg2,
                    tafImg3,
                    tafImg1
                ]}
                contentSubtext={[
                    '',
                    '',
                    ''
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