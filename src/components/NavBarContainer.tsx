import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuality } from '../redux/navActions';
import '../components/NavBarContainer.scss';
import { IState } from '..';
import { WEBGL } from './WebGL';
import { Redirect, withRouter } from 'react-router-dom';

export const NavBarContainerWithRouter = withRouter(props => <NavBarContainer {...props} />); //Allows the navBarContainer to access the current route path

export const NavBarContainer: React.FC = (props: any) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [ redirectToHome, setRedirectToHome ] = useState(false);
    const isHome = props.location.pathname === '/';
    const dispatch = useDispatch();

    const goHomeReset = () => {
        if(!redirectToHome){
            setRedirectToHome(true);

            setTimeout(()=>{
                setRedirectToHome(false);
            }, 10);
        }
       
    }

    return(
        WEBGL.isWebGLAvailable() ? 
        (
            <div className="container-fluid nav-container">
            <div className="row">
                <div className="col-md">
                    <div className="container">
                        <div className='row justify-content-md-center'>
                            {/* Home Button (only render button if NOT home) */}
                            {isHome ?
                                null :
                                (
                                    <div className="text-center h-100 col-md-auto">
                                        <button
                                            onClick={goHomeReset} 
                                            className="qual-btn"
                                        >
                                            Home
                                        </button>
                                    </div>
                                )
                            }
                            {/* Quality Button */}
                            <div className="text-center h-100 col-md-auto">
                                { WEBGL.isWebGLAvailable() ?
                                    (
                                        <button
                                            onClick={()=>{
                                                if(quality === 1){
                                                    window.scrollTo(0,0);
                                                    dispatch(setQuality(2.5));
                                                } else {
                                                    window.scrollTo(0,0);
                                                    dispatch(setQuality(1));
                                                }
                                            }}
                                            className="qual-btn"
                                        >
                                            Quality
                                        </button>
                                    ) :
                                    (
                                        <></>
                                    )}      
                            </div> 
                        </div>
                    </div>
                    
                </div>
            </div>
            {redirectToHome ? <Redirect to="/" /> : null}
        </div>
        ) :
        null
    ); // end of render function
}