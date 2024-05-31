import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImagesContainer.scss';
import { LazyImage } from '../LazyImage/LazyImage';
import { PreloadImage } from '../PreloadImage/PreloadImage';

interface IProps {
    images: string[],
    redirectString: string,
    animationCycle?: number,
    animationSpeed?: 1 | 1.5 | 2 | 3
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    // TODO: These images should be preloaded instead of lazy loaded

    const navigate = useNavigate();
    const isFourImages: boolean = props.images.length === 4;
    let animationSpeed = props?.animationSpeed;

    if (!animationSpeed) {
        animationSpeed = 2;
    }

    useEffect(() => {
        if (isFourImages && props?.animationCycle) {
            const img1Element = document.getElementById(`${props.redirectString}img1`);
            const img2Element = document.getElementById(`${props.redirectString}img2`);
            const img3Element = document.getElementById(`${props.redirectString}img3`);
            const img4Element = document.getElementById(`${props.redirectString}img4`);
    
            if (props.animationCycle === 1) {
                img1Element?.classList.remove('img-up-ani');
                img1Element?.classList.replace('img-fade-in', 'img-fade-out');
                img2Element?.classList.replace('img-fade-out', 'img-fade-in');
                img2Element?.classList.add('img-down-ani');
            } else if (props.animationCycle === 2) {
                img2Element?.classList.remove('img-down-ani');
                img2Element?.classList.replace('img-fade-in', 'img-fade-out');
                img3Element?.classList.replace('img-fade-out', 'img-fade-in');
                img3Element?.classList.add('img-up-ani');
            } else if (props.animationCycle === 3) {
                img3Element?.classList.remove('img-up-ani');
                img3Element?.classList.replace('img-fade-in', 'img-fade-out');
                img4Element?.classList.replace('img-fade-out', 'img-fade-in');
                img4Element?.classList.add('img-down-ani');
            } else if (props.animationCycle === 4) {
                img4Element?.classList.remove('img-down-ani');
                img4Element?.classList.replace('img-fade-in', 'img-fade-out');
                img1Element?.classList.replace('img-fade-out', 'img-fade-in');
                img1Element?.classList.add('img-up-ani');
            }
        }
    }, [props?.animationCycle]);

    return (
        <div className="imgs-container">
            <div className="row justify-content-center">
                <div className="img-container">
                    <div className='img'>
                        {isFourImages ? (
                            <>
                                <img
                                    id={`${props.redirectString}img1`}
                                    className='img-inner img-fade-out'
                                    alt='img1'
                                    style={{
                                        animationDuration: `${props?.animationSpeed ? animationSpeed + 1 : 3}s`
                                    }}
                                    src={props.images[0]}
                                    onClick={()=>navigate(props.redirectString)} />
                                <img
                                    id={`${props.redirectString}img2`}
                                    className='img-inner img-down-ani img-fade-in'
                                    alt='img2'
                                    style={{
                                        animationDuration: `${props?.animationSpeed ? animationSpeed + 1 : 3}s`
                                    }}
                                    src={props.images[1]}
                                    onClick={()=>navigate(props.redirectString)} />
                                <img
                                    id={`${props.redirectString}img3`}
                                    className='img-inner img-fade-out'
                                    alt='img3'
                                    style={{
                                        animationDuration: `${props?.animationSpeed ? animationSpeed + 1 : 3}s`
                                    }}
                                    src={props.images[2]}
                                    onClick={()=>navigate(props.redirectString)} />
                                <img
                                    id={`${props.redirectString}img4`}
                                    className='img-inner img-fade-out'
                                    alt='img4'
                                    style={{
                                        animationDuration: `${props?.animationSpeed ? animationSpeed + 1 : 3}s`
                                    }}
                                    src={props.images[3]}
                                    onClick={()=>navigate(props.redirectString)} />
                            </>
                        ) : (
                            <h1>ERROR: Need to pass exactly 4 images into this container.</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};