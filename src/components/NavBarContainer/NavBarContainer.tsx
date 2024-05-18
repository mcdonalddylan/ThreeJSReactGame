import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuality } from '../../redux/navActions';
import './NavBarContainer.scss';
import { IState } from '../..';
import { WEBGL } from '../../utils/webGlUtils/webGlUtils';
import { Navigate, useLocation } from 'react-router-dom';

export const NavBarContainer: React.FC = () => {

    const location = useLocation();
    const quality: any = useSelector<IState>(state => state.qualityState);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const isHome: boolean = location.pathname === '/';
    const dispatch = useDispatch();

    const goHomeReset = () => {
        if (!redirectToHome) {
            setRedirectToHome(true);

            setTimeout(() => {
                setRedirectToHome(false);
            }, 10);
        }
    }

    return (
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
                                        {WEBGL.isWebGLAvailable() ?
                                            (
                                                <button
                                                    onClick={() => {
                                                        if (quality === 1) {
                                                            window.scrollTo(0, 0);
                                                            dispatch(setQuality(6));
                                                        } else {
                                                            window.scrollTo(0, 0);
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
                    {redirectToHome ? <Navigate replace to="/" /> : null}
                </div>
            ) :
            null
    ); // end of render function
}