import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '../..';
import { setupHomePageLights } from '../../utils/homePageUtils/homePageUtils';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import chevWeb from '../../assets/chevronSvgs/chevWeb.svg';
import { WorkContainer } from '../WorkContainer/WorkContainer';
import '../HomePageContainer/HomePageContainer.scss';

import hcscImg1 from '../../assets/webImages/hcscPublic/formFinderDocDisplay.gif';
import hcscImg2 from '../../assets/webImages/hcscPublic/bcbsMedicareForm.gif';
import hcscImg3 from '../../assets/webImages/hcscPublic/hcscRebrand2023.gif';

import mochiImg1 from '../../assets/webImages/mochiCircle/mochiCircle1.jpg';
import mochiImg2 from '../../assets/webImages/mochiCircle/mochiCircle2.jpg';
import mochiImg3 from '../../assets/webImages/mochiCircle/mochiCircle3.jpg';
import mochiImg4 from '../../assets/webImages/mochiCircle/mochiCircle4.jpg';
import mochiImg5 from '../../assets/webImages/mochiCircle/mochiCircle5.jpg';
import mochiImg6 from '../../assets/webImages/mochiCircle/mochiCircle6.jpg';
import mochiImg7 from '../../assets/webImages/mochiCircle/mochiCircle7.jpg';
import mochiImg8 from '../../assets/webImages/mochiCircle/mochiCircle8.jpg';
import mochiImg9 from '../../assets/webImages/mochiCircle/mochiCircle9.jpg';
import mochiImg10 from '../../assets/webImages/mochiCircle/mochiCircle10.jpg';
import mochiImg11 from '../../assets/webImages/mochiCircle/mochiCircle11.jpg';
import mochiImg12 from '../../assets/webImages/mochiCircle/mochiCircle12.jpg';
import mochiImg13 from '../../assets/webImages/mochiCircle/mochiCircle13.jpg';
import mochiImg14 from '../../assets/webImages/mochiCircle/mochiCircle14.jpg';
import mochiImg15 from '../../assets/webImages/mochiCircle/mochiCircle15.jpg';
import mochiImg16 from '../../assets/webImages/mochiCircle/mochiCircle16.jpg';
import mochiImg17 from '../../assets/webImages/mochiCircle/mochiCircle17.jpg';
import mochiImg18 from '../../assets/webImages/mochiCircle/mochiCircle18.jpg';
import mochiImg19 from '../../assets/webImages/mochiCircle/mochiCircle19.jpg';
import mochiImg20 from '../../assets/webImages/mochiCircle/mochiCircle20.jpg';
import mochiImg21 from '../../assets/webImages/mochiCircle/mochiCircle21.jpg';
import mochiImg22 from '../../assets/webImages/mochiCircle/mochiCircle22.jpg';
import mochiImg23 from '../../assets/webImages/mochiCircle/mochiWalkthrough1.jpg';
import mochiImg24 from '../../assets/webImages/mochiCircle/mochiWalkthrough2.jpg';
import mochiImg25 from '../../assets/webImages/mochiCircle/mochiWalkthrough3.jpg';
import mochiImg26 from '../../assets/webImages/mochiCircle/mochiWalkthrough4.jpg';
import mochiImg27 from '../../assets/webImages/mochiCircle/mochiWalkthrough5.jpg';
import mochiImg28 from '../../assets/webImages/mochiCircle/mochiWalkthrough6.jpg';

import pushImg1 from '../../assets/webImages/pushUp/push-up1.jpg';
import pushImg2 from '../../assets/webImages/pushUp/push-up1-5.jpg';
import pushImg3 from '../../assets/webImages/pushUp/push-up2.jpg';
import pushImg4 from '../../assets/webImages/pushUp/push-up2-5.jpg';
import pushImg5 from '../../assets/webImages/pushUp/push-up3.jpg';
import pushImg6 from '../../assets/webImages/pushUp/push-up4.jpg';
import pushImg7 from '../../assets/webImages/pushUp/push-up5.jpg';
import pushImg8 from '../../assets/webImages/pushUp/push-up6.jpg';
import pushImg9 from '../../assets/webImages/pushUp/push-up7.jpg';
import pushImg10 from '../../assets/webImages/pushUp/push-up8.jpg';
import pushImg11 from '../../assets/webImages/pushUp/push-up9.jpg';
import pushImg12 from '../../assets/webImages/pushUp/push-up10.jpg';

import clientImg1 from '../../assets/webImages/clientEngage/client1.jpg';
import clientImg2 from '../../assets/webImages/clientEngage/client2.jpg';
import clientImg3 from '../../assets/webImages/clientEngage/client3.jpg';
import clientImg4 from '../../assets/webImages/clientEngage/client4.jpg';
import clientImg5 from '../../assets/webImages/clientEngage/client5.jpg';

import { addingWebFBXFile } from '../../utils/fbxUtils/fbxUtils';

export const WebPageContainer: React.FC = () => {
    
    // Colors
    const mainColor = '#7dd5f5';
    const bgColor = '#062432';

    const quality: any = useSelector<IState>(state=>state.qualityState);
    // const [refresh, setRefresh] = useState(false);
    
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
        
        // Adding the abstract web 3D model to the page background
        let webMat = new THREE.MeshPhongMaterial({
            color: bgColor,
            shininess: 0,
            reflectivity: 0
        });
        let webShinyMat = new THREE.MeshPhongMaterial({
            color: bgColor,
            shininess: 100,
            reflectivity: 1
        });
        addingWebFBXFile(scene, renderer, camera, webMat, webShinyMat, animate);

        //set to top of page when first entering page
        window.scrollTo(0,0);

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    }, [quality]);
    
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
                        Web Projects:
                    </h1>
                </div>
            </div>

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2023+'
                title='Health Care Service Corporation - Public Sites'
                contentLinks={[
                    {
                        linkText: 'Form Finder Site',
                        linkUrl: 'https://www.bcbsil.com/form-finder'
                    },
                    {
                        linkText: 'Medicare Documents Search Form',
                        linkUrl: 'https://www.bcbsil.com/medicare/tools-resources/forms-documents/mapd-plan-documents'
                    }
                ]}
                content={(
                    <>
                        <p>This is the second project and second team I've worked with at Blue Cross Blue Sheild HQ in Illinois. Yet another great team with plenty of front-end and back-end work for me to do.</p>
                        <br></br>
                        <p>Since these sites are public, I can more easily show the work I've done. Here are some other contributions from my time with this team:</p>
                        <ul>
                            <li>
                                Implemented code which dynamically injects the "line of business" and "role" the user has selected into links on an instruction page.
                            </li>
                        </ul>
                    </>
                )}
                contentImgs={[
                    hcscImg2,
                    hcscImg1,
                    hcscImg3
                ]}
                contentSubtext={[
                    'Implemented a medicare zipcode search form using Javascript ES5, HTML, CSS, and the Foundation framework.',
                    'Created the Form Finder document display, search, and pagination features using Javascript ES5, HTML, CSS, and AEM.',
                    'Updated the HCSC banners during the redesign campaign in late 2023 using Javascript, HTML, CSS, and AEM.'
                ]}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2021 - 2023'
                title='Blue Access for Members 2.0'
                contentLinks={[
                    {
                        linkText: 'Illinois member forms and documents page',
                        linkUrl: 'https://mybam.bcbsil.com/documents'
                    },
                    {
                        linkText: 'Illinois member message center page',
                        linkUrl: 'https://mybam.bcbsil.com/messages'
                    }
                ]}
                content={(
                    <>
                        <p>
                            My first enterprise-level project for Blue Cross Blue Shield. 
                            I was one of two dev specialists within an internal team of 6 other developers.
                        </p>
                        <br></br>
                        <p>My contributions:</p>
                        <ul>
                            <li>
                                Created a system for uploading and downloading attachments on messages.
                            </li>
                            <li>
                                Added a message threading feature to allow users to view previous reply messages.
                            </li>
                            <li>
                                Refactored our four support pages to use micro-front-end architecture with the single-spa-react library.
                            </li>
                            <li>
                                Deployed all four of our UI pages and all seven of our support APIs to each test environment using Jenkins and UCD. I've also deployed to the production environment using Pivotal Cloud Foundry and the Concourse CLI.
                            </li>
                            <li>
                                Implemented a dynamic form which allows the user to schedule an appointment with a nurse health advocate.
                            </li>
                            <li>
                                Added loadtime-weaving to our APIs with AspectJ and Spring AOP for more effecient logging.
                            </li>
                        </ul>
                    </>

                )}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
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
                        <p>This is a web application to encourage those of us who are on our computers for hours on end, to do some push ups every so often. More detailed information about the project itself can be in the github link above.</p>
                        <br></br>
                        <p>This is my first solo project that I’ve worked on in a few months. As much as I enjoy React and front-end development in general, it’s nice to get back into Spring and get some back-end work again. I mostly created this app just to keep my skills fresh, but I do genuinely think it’s a very useful tool for a lot of us out there. I just can’t wait to get a little further with it so that it can finally be deployed.</p>
                    </>
                )}
                contentImgs={[
                    pushImg3,
                    pushImg2,
                    pushImg1,
                    pushImg4,
                    pushImg5,
                    pushImg6,
                    pushImg7,
                    pushImg8,
                    pushImg9,
                    pushImg10,
                    pushImg11,
                    pushImg12
                ]}
                contentSubtext={[
                    'Created an authenticated login component using React-Redux, Java, and Spring.',
                    'Implemented dynamic alerts using the a React-Redux global state.',
                    'Added a light/dark theme button and animated buttons based on a wireframe created in Photoshop.'
                ]}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
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
                        <p>
                            This is a web application to map batches of Revature associates with client who may be interesting in hiring them. The photos above are markups/wireframes I created for each page I was responsible for. More detailed information about the project itself can be in the github links above. My responsibilities were the following:
                        </p>
                        <br></br>
                        <p>
                            My contributions:
                        </p>
                        <ul>
                            <li>
                                As one of the Style Captains I kept the SCSS consistent throughout the front end.
                            </li>
                            <li>
                                Drew mock ups for each of the client pages.
                            </li>
                            <li>
                                Created the logo for this application as an .svg file.
                            </li>
                            <li>
                                Encrypted the database url, username, and password on the back end using Jasypt.
                            </li>
                            <li >
                                Created the “batch cards” which represent the individual batches tied to a client.
                            </li>
                            <li >
                                Implemented a “batchstate” using the Flux design pattern to temporarily store batch data in the store.
                            </li>
                            <li >
                                Gathered data from our mock-up database to populate the “batch cards” I created.
                            </li>
                            <li >
                                Allowed information about a specific batch populate the fields of our “batch view” page.
                            </li>
                            <li >
                                Tested my front end React components using Enzyme and Jest.
                            </li>
                            <li >
                                Kept track of the application’s progress using GitHub’s “projects” tab and Asana.
                            </li>
                        </ul>
                        <br></br>
                        <p>
                            This project, like all of them really, was a great learning experience. While I was very focused on the front-end in my mochi circle project, this project let me go wild. I became very familiar with React, typescript, and git by the end of it. While communication wasn’t as strong as it was was working in a smaller team, using githubs “projects” management board system and Asana were very helpful.
                        </p>
                    </>
                )}
                contentImgs={[
                    clientImg3,
                    clientImg2,
                    clientImg1,
                    clientImg4,
                    clientImg5,
                ]}
                contentSubtext={[
                    'Designed and implemented the "batch-details" page using Photoshop and React.',
                    'Designed the "batch-state" page using Photoshop.',
                    'Created an authenticated login component using React-Redux, Java, and Spring.'
                ]}
            />

            <WorkContainer
                chevronImgSrc={chevWeb}
                color={mainColor}
                bgColor={bgColor}
                year='2020'
                title='Mochi Circle'
                contentLinks={[
                    {
                        linkText: 'Click Here to Download The Source Files V0.2',
                        linkUrl: 'https://drive.google.com/file/d/1x4x53Fq6nlY-qvrqi8WRR84CyqXKEkse/view'
                    }
                ]}
                content={(
                    <>
                        <p>
                            An online food delivery application I worked on for the company Revature. I designed and programmed each of the web pages on the site. While it’s still in the early stages, the request page will properly calculate your order amount. 
                        </p>
                    </>
                )}
                contentImgs={[
                    mochiImg1,
                    mochiImg2,
                    mochiImg3,
                    mochiImg4,
                    mochiImg5,
                    mochiImg6,
                    mochiImg7,
                    mochiImg8,
                    mochiImg9,
                    mochiImg10,
                    mochiImg11,
                    mochiImg12,
                    mochiImg13,
                    mochiImg14,
                    mochiImg15,
                    mochiImg16,
                    mochiImg17,
                    mochiImg18,
                    mochiImg19,
                    mochiImg20,
                    mochiImg21,
                    mochiImg22,
                    mochiImg23,
                    mochiImg24,
                    mochiImg25,
                    mochiImg26,
                    mochiImg27,
                    mochiImg28
                ]}
                contentSubtext={[
                    'Coded both the front-end and back-end of the user homepage using React-Redux, Java and Spring.',
                    'Implemented the back-end of the email verification feature using the Java-Mail-API and Spring.',
                    'Created the messaging front-end code using React-Redux.'
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