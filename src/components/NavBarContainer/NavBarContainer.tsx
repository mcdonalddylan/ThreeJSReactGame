import React, { useState, useEffect } from 'react';
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

    useEffect(() => {

    }, []);

    return (
        <>
            {WEBGL.isWebGLAvailable() &&
                (
                    <div className="nav-bar-comp">
                        <div className="nav-bar-comp__row">
                            {/* Home Button (only render button if NOT home) */}
                            {!isHome &&
                                <div className="nav-bar-comp__col">
                                    <button
                                        onClick={goHomeReset}
                                        className='nav-bar-comp__btn'>
                                        Home
                                    </button>
                                </div>
                            }
                            {/* Quality Button */}
                            {WEBGL.isWebGLAvailable() &&
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
                                    className='nav-bar-comp__btn'>
                                    Quality
                                </button>
                            }
                        </div>
                        {redirectToHome && <Navigate replace to="/" />}
                    </div>
            )}
        </>
    ); // end of render function
}