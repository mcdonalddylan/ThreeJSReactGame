import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './ImagesContainer.scss';

interface IProps {
    images: string[],
    redirectString: string,
    animationSpeed?: 1 | 1.5 | 2 | 3
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const [redirect, setRedirect] = useState(false);
    const isFourImages: boolean = props.images.length === 4;
    const animationCycle = useRef(0);
    let animationSpeed = props.animationSpeed;

    if (!animationSpeed) {
        animationSpeed = 2;
    }

    useEffect(() => {
        if (isFourImages) {
            setInterval(() => {
                animationCycle.current = (animationCycle.current + 1) % 4;
        
                const img1Element = document.getElementById(`${props.redirectString}img1`);
                const img2Element = document.getElementById(`${props.redirectString}img2`);
                const img3Element = document.getElementById(`${props.redirectString}img3`);
                const img4Element = document.getElementById(`${props.redirectString}img4`);
        
                if (animationCycle.current === 0) {
                    img1Element?.classList.remove('img-up-ani');
                    img1Element?.classList.replace('img-fade-in', 'img-fade-out');
                    img2Element?.classList.replace('img-fade-out', 'img-fade-in');
                    img2Element?.classList.add('img-down-ani');
                } else if (animationCycle.current === 1) {
                    img2Element?.classList.remove('img-down-ani');
                    img2Element?.classList.replace('img-fade-in', 'img-fade-out');
                    img3Element?.classList.replace('img-fade-out', 'img-fade-in');
                    img3Element?.classList.add('img-up-ani');
                } else if (animationCycle.current === 2) {
                    img3Element?.classList.remove('img-up-ani');
                    img3Element?.classList.replace('img-fade-in', 'img-fade-out');
                    img4Element?.classList.replace('img-fade-out', 'img-fade-in');
                    img4Element?.classList.add('img-down-ani');
                } else if (animationCycle.current === 3) {
                    img4Element?.classList.remove('img-down-ani');
                    img4Element?.classList.replace('img-fade-in', 'img-fade-out');
                    img1Element?.classList.replace('img-fade-out', 'img-fade-in');
                    img1Element?.classList.add('img-up-ani');
                }
            }, (animationSpeed as number)*1000);
        }
    }, []);

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
                                        id={`${props.redirectString}img1`}
                                        className='img-inner img-fade-out'
                                        style={{
                                            animationDuration: `${animationSpeed ? animationSpeed + 1 : 3}s`
                                        }}
                                        src={props.images[0]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`${props.redirectString}img2`}
                                        className='img-inner img-down-ani img-fade-in'
                                        style={{
                                            animationDuration: `${animationSpeed ? animationSpeed + 1 : 3}s`
                                        }}
                                        src={props.images[1]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`${props.redirectString}img3`}
                                        className='img-inner img-fade-out'
                                        style={{
                                            animationDuration: `${animationSpeed ? animationSpeed + 1 : 3}s`
                                        }}
                                        src={props.images[2]}
                                        onClick={()=>setRedirect(true)}
                                    />
                                    <img
                                        id={`${props.redirectString}img4`}
                                        className='img-inner img-fade-out'
                                        style={{
                                            animationDuration: `${animationSpeed ? animationSpeed + 1 : 3}s`
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