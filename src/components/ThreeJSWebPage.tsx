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
import './HomePage.scss';

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
    
            webMesh.rotation.x = currentScrollPos * 0.01;
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
                            color: '#22b5ff',
                            textShadow: `0 0 4px ${'#22b5ff'}`
                        }}
                    >
                        Web Projects:
                    </h1>
                </div>
            </div>

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
                year='2021'
                title='Push Up App'
                contentLinks={[
                    {
                        linkText: 'Github Link',
                        linkUrl: 'https://github.com/mcdonalddylan/PushUpReactApp'
                    }
                ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>This is a web application to encourage those of us who are on our computers for hours on end, to do some push ups every so often. More detailed information about the project itself can be in the github link above.</p>
                        <br></br>
                        <p style={{color: 'white'}}>This is my first solo project that I’ve worked on in a few months. As much as I enjoy React and front-end development in general, it’s nice to get back into Spring and get some back-end work again. I mostly created this app just to keep my skills fresh, but I do genuinely think it’s a very useful tool for a lot of us out there. I just can’t wait to get a little further with it so that it can finally be deployed.</p>
                    </>
                )}
                contentImgs={[
                    webImg4,
                    webImg2,
                    webImg3,
                    webImg1
                ]}
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
                            linkUrl: 'https://github.com/revaturelabs/client-engagement-portal-front'
                        },
                        {
                            linkText: 'Github back end',
                            linkUrl: 'https://github.com/revaturelabs/client-engagement-portal-front'
                        }
                    ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            This is a web application to map batches of Revature associates with client who may be interesting in hiring them. The photos above are markups/wireframes I created for each page I was responsible for. More detailed information about the project itself can be in the github links above. My responsibilities were the following:
                        </p>
                        <br></br>
                        <p style={{color: 'white'}}>
                            My contributions:
                        </p>
                        <ul>
                            <li style={{color: 'white'}}>
                                As one of the Style Captains I kept the SCSS consistent throughout the front end.
                            </li>
                            <li style={{color: 'white'}}>
                                Drew mock ups for each of the client pages.
                            </li>
                            <li style={{color: 'white'}}>
                                Created the logo for this application as an .svg file.
                            </li>
                            <li style={{color: 'white'}}>
                                Encrypted the database url, username, and password on the back end using Jasypt.
                            </li>
                            <li style={{color: 'white'}}>
                                Created the “batch cards” which represent the individual batches tied to a client.
                            </li>
                            <li style={{color: 'white'}}>
                                Implemented a “batchstate” using the Flux design pattern to temporarily store batch data in the store.
                            </li>
                            <li style={{color: 'white'}}>
                                Gathered data from our mock-up database to populate the “batch cards” I created.
                            </li>
                            <li style={{color: 'white'}}>
                                Allowed information about a specific batch populate the fields of our “batch view” page.
                            </li>
                            <li style={{color: 'white'}}>
                                Tested my front end React components using Enzyme and Jest.
                            </li>
                            <li style={{color: 'white'}}>
                                Kept track of the application’s progress using GitHub’s “projects” tab and Asana.
                            </li>
                        </ul>
                        <br></br>
                        <p style={{color: 'white'}}>
                            This project, like all of them really, was a great learning experience. While I was very focused on the front-end in my mochi circle project, this project let me go wild. I became very familiar with React, typescript, and git by the end of it. While communication wasn’t as strong as it was was working in a smaller team, using githubs “projects” management board system and Asana were very helpful.
                        </p>
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
                contentLinks={[
                    {
                        linkText: 'Click Here to Download The Source Files V0.2',
                        linkUrl: 'https://drive.google.com/file/d/1x4x53Fq6nlY-qvrqi8WRR84CyqXKEkse/view'
                    },
                    {
                        linkText: 'Click Here to View Code Sample',
                        linkUrl: '/'
                    }
                ]}
                content={(
                    <>
                        <p style={{color: 'white'}}>
                            An online food delivery application I worked on for the company Revature. I designed and programmed each of the web pages on the site. While it’s still in the early stages, the request page will properly calculate your order amount. 
                        </p>
                    </>
                )}
                contentImgs={[
                    webImg2,
                    webImg1,
                    webImg3,
                    webImg4
                ]}
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