import React, { useEffect, useState } from 'react';
import * as THREE from "three";
import { setupHomePageLights, setupHomePageObjects } from '../../utils/homePageUtils/homePageUtils';
import './HomePageContainer.scss';
import { useSelector } from 'react-redux';
import { IState } from '../..';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import { ImagesContainer } from '../ImagesContainer/ImagesContainer';
import { ReactComponent as ResLogo } from '../../assets/logoSvgs/resumeLogo.svg';
import { ReactComponent as LinLogo } from '../../assets/logoSvgs/tieLogo.svg';
import { ReactComponent as EmaLogo } from '../../assets/logoSvgs/emailLogo.svg';
import { ReactComponent as GitLogo } from '../../assets/logoSvgs/githubLogo.svg';

import webImg1 from '../../assets/webImages/hcscPublic/formFinderDocDisplay.gif';
import webImg2 from '../../assets/webImages/pushUp/push-up1-5.jpg';
import webImg3 from '../../assets/webImages/hcscPublic/hcscRebrand2023.gif';
import webImg4 from '../../assets/webImages/mochiCircle/mochiCircle1.jpg';

import gameImg1 from '../../assets/gameImages/balloon/screenshot02.jpg';
import gameImg2 from '../../assets/gameImages/coolTitle/cooltitlescreen05.jpg';
import gameImg3 from '../../assets/gameImages/square/avoidrect03.jpg';
import gameImg4 from '../../assets/gameImages/taffyPilot/taffy-pilot-in-dick-land-menu.gif';

import artImg1 from '../../assets/artImages/characterDesigns/TP_Character_Model_Sheet.jpg';
import artImg2 from '../../assets/artImages/creatureDesigns/Dragon.jpg';
import artImg3 from '../../assets/artImages/other/GoodOlBoiV4.jpg';
import artImg4 from '../../assets/artImages/realArt/PrideCharcoal.jpg';

import { useNavigate } from 'react-router-dom';

export const HomePageContainer: React.FC = () => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    // const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [isMobileAspectRatio, setIsMobileAspectRatio] = useState(false);

    const [animationCycle, setAnimationCycle] = useState(1);
    const IMAGES_ANIMATION_SPEED = 2;
    let animationTimerId: any = undefined;

    useEffect(() => {
        // The image animation timer
        if (!animationTimerId) {
            animationTimerId = setInterval(() => {
                setAnimationCycle(currentAnimationCycle => {
                    if((currentAnimationCycle + 1) % 5 === 0){
                        return 1;
                    } else {
                        return (currentAnimationCycle + 1) % 5;
                    }
                });
            }, IMAGES_ANIMATION_SPEED*1000);
        }
        return () => clearInterval(animationTimerId);
    }, []);
    
    useEffect(()=>{

        if ( WEBGL.isWebGLAvailable() ) { 
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
            
            // window.onresize = () => {
            //     renderer.setSize( window.innerWidth, window.innerHeight);
            //     setRefresh(!refresh);
            // };

            // Camera / Scene setup
            let scene = new THREE.Scene();
            let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);

            // Render function babyyyyy
            renderer.render( scene, camera );

            // Light setup
            setupHomePageLights( scene );
            
            // Object placement/animation/inputs
            setupHomePageObjects( scene, renderer, camera, quality, isMobileAspectRatio );
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }

    },[quality, isMobileAspectRatio]);

    const wobbleToggle = (event: any) => {
        const element: HTMLCanvasElement = event.target;
        const container: HTMLCanvasElement = event.currentTarget;

        if (element.tagName !== 'IMG' && element.tagName !== 'A'){
            if (container.classList.contains('wobble')){
                container.classList.remove('wobble');
                container.classList.add('non-wobble');
            } else {
                container.classList.remove('non-wobble');
                container.classList.add('wobble');
            }
        }
    };

    return(
        <div className="home-page-comp">            
            <div className="home-page-comp__text-grid home-page-comp__text-grid--first wobble" id="first" onClick={wobbleToggle}>
                    <h1 className="home-page-comp__main-header">
                        Dylan McDonald
                    </h1>
                    <hr className="home-page-comp__main-hr"></hr>
                    <h3 className="home-page-comp__main-sub">
                        React & Java Developer  |  Game Developer
                    </h3>
                    <div className="home-page-comp__links-row">
                        <div className="home-page-comp__links-col">
                            <a href='https://docs.google.com/document/d/1z9Wxv00gJzBwnmLd6gWF5FjgUcYMDd-O/edit?usp=sharing&ouid=107142401991010822003&rtpof=true&sd=true'
                               className='home-page-comp__link'
                               target='_blank'>
                                <div className="home-page-comp__link-img">
                                    <ResLogo />
                                </div>
                                <p className='home-page-comp__link-label'>Resume</p>
                            </a>
                        </div>
                        <div className="home-page-comp__links-col">
                            <a href='http://www.linkedin.com/in/dylan-mcdonald-968709193'
                               className='home-page-comp__link'
                               target='_blank'>
                                <div className="home-page-comp__link-img">
                                    <LinLogo />
                                </div>
                                <p className='home-page-comp__link-label'>Linked-in</p>
                            </a>
                        </div>
                        <div className="home-page-comp__links-col">
                            <a href='mailto:dylandavidmcdonald@gmail.com' 
                               className='home-page-comp__link'
                               target='_blank'>
                                <div className="home-page-comp__link-img">
                                    <EmaLogo />
                                </div>
                                <p className='home-page-comp__link-label'>Email</p>
                            </a>
                        </div>
                        <div className="home-page-comp__links-col">
                            <a href='https://github.com/mcdonalddylan'
                               className='home-page-comp__link'
                               target='_blank'>
                                <div className="home-page-comp__link-img">
                                    <GitLogo />
                                </div>
                                <p className='home-page-comp__link-label'>GitHub</p>
                            </a>
                        </div>
                    </div>
            </div>
            
            <div className="home-page-comp__text-grid home-page-comp__text-grid--second fade-out wobble" id="second" onClick={wobbleToggle}>
                <div className='home-page-comp__page-nav-row'>
                    <div className='home-page-comp__page-nav-col home-page-comp__page-nav-col--larger-link'>
                        <a className="home-page-comp__larger-link" href='#/web'>
                            Web Projects
                        </a>
                    </div>
                    <div className='home-page-comp__page-nav-col'>
                        <ImagesContainer
                            images={[webImg1, webImg2, webImg3, webImg4]}
                            redirectString={'/web'}
                            animationCycle={animationCycle}
                            animationSpeed={IMAGES_ANIMATION_SPEED}
                        />
                    </div>
                </div>
            </div>

            <div className="home-page-comp__text-grid home-page-comp__text-grid--second fade-out wobble" id="third" onClick={wobbleToggle}>
                <div className='home-page-comp__page-nav-row'>
                    <div className='home-page-comp__page-nav-col home-page-comp__page-nav-col--larger-link'>
                        <a className="home-page-comp__larger-link" href='#/game'>
                            Game Projects
                        </a>
                    </div>
                    <div className='home-page-comp__page-nav-col'>
                        <ImagesContainer
                            images={[gameImg1, gameImg2, gameImg3, gameImg4]}
                            redirectString={'/game'}
                            animationCycle={animationCycle}
                            animationSpeed={IMAGES_ANIMATION_SPEED}
                        />
                    </div>
                </div>
            </div>

            <div className="home-page-comp__text-grid home-page-comp__text-grid--second fade-out wobble" id="fourth" onClick={wobbleToggle}>
                <div className='home-page-comp__page-nav-row'>
                    <div className='home-page-comp__page-nav-col home-page-comp__page-nav-col--larger-link'>
                        <a className="home-page-comp__larger-link" href='#/art'>
                            Art Projects
                        </a>
                    </div>
                    <div className='home-page-comp__page-nav-col'>
                        <ImagesContainer
                            images={[artImg1, artImg2, artImg3, artImg4]}
                            redirectString={'/art'}
                            animationCycle={animationCycle}
                            animationSpeed={IMAGES_ANIMATION_SPEED}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
