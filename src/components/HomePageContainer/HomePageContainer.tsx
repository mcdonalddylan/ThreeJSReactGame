import React, { useEffect, useState } from 'react';
import * as THREE from "three";
import { setupHomePageLights, setupHomePageObjects } from '../../utils/homePageUtils/homePageUtils';
import './HomePageContainer.scss';
import { useSelector } from 'react-redux';
import { IState } from '../..';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import { ImagesContainer } from '../ImagesContainer/ImagesContainer';
import resLogo from '../../assets/logoSvgs/resumeLogo.svg';
import linLogo from '../../assets/logoSvgs/tieLogo.svg';
import emaLogo from '../../assets/logoSvgs/emailLogo.svg';
import gitLogo from '../../assets/logoSvgs/githubLogo.svg';

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

    },[quality]);

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
        <div className="container position-absolute" style={{right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="row justify-content-center text-grid wobble" id="first" onClick={wobbleToggle}>
                <div className="col-sm-8 center-block">
                    <h1 className="main-header">
                        Dylan McDonald
                    </h1>
                    <hr className="main-hr"></hr>
                    <h3 className="main-sub">
                        React & Java Developer  |  Game Developer
                    </h3>
                    <div className="row justify-content-center" style={{margin: "auto", textAlign: "center"}}>
                        <div className="col-sm-3">
                            <a href='https://docs.google.com/document/d/1z9Wxv00gJzBwnmLd6gWF5FjgUcYMDd-O/edit?usp=sharing&ouid=107142401991010822003&rtpof=true&sd=true'
                            className="main-link" target='_blank'>
                                Resume 
                            </a>
                            <img alt='resume-logo' className="main-img"
                            src={resLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='http://www.linkedin.com/in/dylan-mcdonald-968709193' 
                            className="main-link" target='_blank'>
                                Linked-in 
                            </a>
                            <img alt='linkedin-logo' className="main-img"
                            src={linLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='mailto:dylandavidmcdonald@gmail.com' 
                            className="main-link" target='_blank'>
                                Email 
                            </a>
                            <img alt='email-logo' className="main-img"
                            src={emaLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='https://github.com/mcdonalddylan'
                            className="main-link" target='_blank'>
                                GitHub 
                            </a>
                            <img alt='github-logo' className="main-img"
                            src={gitLogo}/>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileAspectRatio ?
            <>
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
            </>
            :
            <>
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
            </>
            }
            

            <div className="row justify-content-center text-grid fade-out wobble" id="second" onClick={wobbleToggle}>
                <div className="col-sm-8 my-auto text-center" >
                    <a className="larger-link" onClick={()=>navigate('/web')}>
                        Web Projects
                    </a>
                </div>
                <div className="col-sm-4" >
                    <ImagesContainer
                        images={[webImg1, webImg2, webImg3, webImg4]}
                        redirectString={'/web'}
                        animationCycle={animationCycle}
                        animationSpeed={IMAGES_ANIMATION_SPEED}
                    />
                </div>
            </div>

            {isMobileAspectRatio ?
            <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>
            :
            <>
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
            </>
            }

            
            <div className="row justify-content-center text-grid fade-out wobble" id="third" onClick={wobbleToggle}>
                <div className="col-sm-8 my-auto text-center" >
                    <a className="larger-link" onClick={()=>navigate('/game')}>
                        Game Projects
                    </a>
                </div>
                <div className="col-sm-4" >
                    <ImagesContainer
                        images={[gameImg1, gameImg2, gameImg3, gameImg4]}
                        redirectString={'/game'}
                        animationCycle={animationCycle}
                        animationSpeed={IMAGES_ANIMATION_SPEED}
                    />
                </div>
            </div>

            {isMobileAspectRatio ?
            <>
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
            </>
            :
            <>
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
            </>
            }

            <div className="row justify-content-center text-grid fade-out wobble" id="fourth" onClick={wobbleToggle}>
                <div className="col-sm-8 my-auto text-center" >
                    <a className="larger-link" onClick={()=>navigate('/art')}>
                        Art Projects
                    </a>
                </div>
                <div className="col-sm-4" >
                    <ImagesContainer
                        images={[artImg1, artImg2, artImg3, artImg4]}
                        redirectString={'/art'}
                        animationCycle={animationCycle}
                        animationSpeed={IMAGES_ANIMATION_SPEED}
                    />
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
