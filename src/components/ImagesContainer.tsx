import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './ImagesContainer.scss';
import './HomePage.scss'; //needed for fading in and out

interface IProps {
    images: string[],
    redirectString: string
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const [redirect, setRedirect] = useState(false);
    const isFourImages = props.images.length === 4;

    //TODO: Animate using javascript setInterval since Css animation won't sync with eachother.
    // The fade-in and fade-out classes can be re-used from homepage.scss.

    return (
        <div className="imgs-container">
            <div className="row justify-content-center">
                <div className="">
                    <div className="img-container">
                        <div className='img'>
                            {isFourImages ? (
                                <>
                                    <img
                                        id={`img1`}
                                        className='img-inner img-ani'
                                        style={{
                                            //place additional sources here
                                        }}
                                        src={props.images[0]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`img2`}
                                        className='img-inner img-ani'
                                        style={{
                                            //place additional sources here
                                        }}
                                        src={props.images[1]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`img3`}
                                        className='img-inner img-ani'
                                        style={{
                                            //place additional sources here
                                            display: 'none'
                                        }}
                                        src={props.images[2]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`img4`}
                                        className='img-inner img-ani'
                                        style={{
                                            //place additional sources here
                                            display: 'none'
                                        }}
                                        src={props.images[3]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                </>
                            ) : (
                                <h1>ERROR: Need to pass exactly 4 images into this container.</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to={props.redirectString}/> : <></>}
        </div>
    )
};