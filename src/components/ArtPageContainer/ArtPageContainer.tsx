import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '../..';
import { setupHomePageLights } from '../../utils/homePageUtils/homePageUtils';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import chevArt from '../../assets/chevronSvgs/chevArt.svg';
import { ArtworkContainer } from '../ArtworkContainer/ArtworkContainer';
import '../HomePageContainer/HomePageContainer.scss';

import garticImg1 from '../../assets/artImages/gartic/garticShockAni.gif';
import garticImg2 from '../../assets/artImages/gartic/fastFurious.png';
import garticImg3 from '../../assets/artImages/gartic/uncharted.png';
import garticImg4 from '../../assets/artImages/gartic/noTitle.png';

import realImg1 from '../../assets/artImages/realArt/IMG_0996_edited.jpg';
import realImg2 from '../../assets/artImages/realArt/IMG_1024_edited.jpg';
import realImg3 from '../../assets/artImages/realArt/PrideCharcoal.jpg';

import charImg1 from '../../assets/artImages/characterDesigns/TP_Character_Model_Sheet.jpg';
import charImg2 from '../../assets/artImages/characterDesigns/model_sheet_final_v2.jpg';
import charImg3 from '../../assets/artImages/characterDesigns/model_sheet_hybrid_v3.jpg';

import inkImg1 from '../../assets/artImages/creatureDesigns/3D Bug Thang.jpg';
import inkImg2 from '../../assets/artImages/creatureDesigns/Basalisk.jpg';
import inkImg3 from '../../assets/artImages/creatureDesigns/Cerberus.jpg';
import inkImg4 from '../../assets/artImages/creatureDesigns/Chameleon Dude.jpg';
import inkImg5 from '../../assets/artImages/creatureDesigns/Dragon.jpg';
import inkImg6 from '../../assets/artImages/creatureDesigns/Elemental.jpg';
import inkImg7 from '../../assets/artImages/creatureDesigns/Kelpie.jpg';
import inkImg8 from '../../assets/artImages/creatureDesigns/Mech.jpg';
import inkImg9 from '../../assets/artImages/creatureDesigns/Plant Monster.jpg';
import inkImg10 from '../../assets/artImages/creatureDesigns/Siren.jpg';

import { addingArtFBXFile } from '../../utils/fbxUtils/fbxUtils';

export const ArtPageContainer: React.FC = () => {
    
    // Colors
    const mainColor = '#e8ed47';
    const bgColor = '#5a5c27';

    const quality: any = useSelector<IState>(state=>state.qualityState);
    // const [refresh, setRefresh] = useState(false);
    const [isMobileAspectRatio, setIsMobileAspectRatio] = useState(false);

    useEffect(()=>{
        if (WEBGL.isWebGLAvailable()) {

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio/quality );

        if (window.innerHeight > window.innerWidth && !isMobileAspectRatio) {
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
        
        // window.onresize = () => {
        //     renderer.setSize( window.innerWidth, window.innerHeight);
        //     setRefresh(!refresh);
        // };

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);

        // Light setup
        setupHomePageLights( scene );

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
        
        // Adding the art pallet 3D model to the page background
        let artMat = new THREE.MeshPhongMaterial({
            color: bgColor,
            shininess: 0,
            reflectivity: 0
        });
        let artShinyMat = new THREE.MeshPhongMaterial({
            color: bgColor,
            shininess: 100,
            reflectivity: 1
        });
        addingArtFBXFile(scene, renderer, camera, artMat, artShinyMat, animate);

        // Set to top of page when first entering page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    }, [quality]);
    
    return(
        <div className='container position-absolute' style={{right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>
            
            <div className='row justify-content-center'>
                <div className='col-12-xm'>
                    <h1 className='page-title'>
                        Art Projects:
                    </h1>
                </div>
            </div>

            <div className='row justify-content-center'>
                <ArtworkContainer
                    key={'gartic'}
                    chevronImgSrc={chevArt}
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
                        garticImg1,
                        garticImg2,
                        garticImg3,
                        garticImg4
                    ]}
                    contentSubtext={[
                        'This was from my first and last gartic animation session. Not a great environment for animation, that\'s for sure.',
                        'Man that guy is fast. Sheeesh.',
                        'Doesn\'t Nathan Drake have a massive chin? No? I still like this one.'
                    ]}              
                />

                <ArtworkContainer
                    key={'charcoal'}
                    chevronImgSrc={chevArt}
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
                    contentSubtext={[
                        'Effortless Success - 2019',
                        'Crystal Ball - 2019',
                        'Pride - 2019'
                    ]}        
                />

                <ArtworkContainer
                    key={'character designs'}
                    chevronImgSrc={chevArt}
                    color={mainColor}
                    bgColor={bgColor}
                    year={'2017'}
                    title={'Character Designs'}
                    mobileAspectRatio={isMobileAspectRatio}
                    content={(
                        <>
                            <p style={{color: 'white'}}>
                                Model Sheets for charcters I planned on using for animations & games in the near future.
                            </p>
                        </>
                    )}
                    contentImgs={[
                        charImg2,
                        charImg1,
                        charImg3
                    ]}
                    contentSubtext={[
                        'Neb was code-named an "anxious nerdo fuckster" by a fellow student. I think it fits.',
                        'Taffy Pilot was desgined for an adventure game very similar to Conker\'s Bad Fur Day. I ended up using him on a short film instead.',
                        'Gep was meant to be the "everybody\'s uncle" character in a short animated series meant for YouTube.'
                    ]}                
                />

                <ArtworkContainer
                    key={'inkTober'}
                    chevronImgSrc={chevArt}
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
                    contentSubtext={[
                        'Siren! Get it? I had fun with this one.',
                        'I kinda struggled with my Basilisk concept, so messing with Harry Potter lore it is!',
                        'Cerberus is a real dingus, I\'ll tell ya that much. And I don\'t use that word lightly.'
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