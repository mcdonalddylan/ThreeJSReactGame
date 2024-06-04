import React, { useState, useEffect } from 'react';
import './ImageCarousel.scss';
import { viewImg } from '../../utils/internalPageUtils/internalPageUtils';
import { LazyImage } from '../LazyImage/LazyImage';

interface IProps {
    images: string[],
    subtext: string[],
    bgColor: string,
    color: string,
    lqImages?: string[]
}

export const ImageCarousel: React.FC<IProps> = (props:IProps) => {

    const [selectedImg, setSelectedImg] = useState<number>(2);

    const handleSelectImage = (event: React.MouseEvent, selectedImageNum: number, imageSrc: string) => {
        event.preventDefault();
        if (selectedImg === selectedImageNum) {
            viewImg(imageSrc);
        }
        else {
            setSelectedImg(selectedImageNum);
        }
    }

    const cycleSelectedImg = (event: React.MouseEvent, direction: string) => {
        event.preventDefault();
        if (selectedImg === 1 && direction === 'left') {
            setSelectedImg(3);
        } else if (selectedImg === 1 && direction === 'right') {
            setSelectedImg(2);
        } else if (selectedImg === 2 && direction === 'left') {
            setSelectedImg(1);
        } else if (selectedImg === 2 && direction === 'right') {
            setSelectedImg(3);
        } else if (selectedImg === 3 && direction === 'left') {
            setSelectedImg(2);
        } else {
            setSelectedImg(1);
        }
    }

    // Triggers the fade in effect for the image subtext
    useEffect(() => {
        const subtext = document.querySelector('.img-carousel-comp__subtext');
        subtext?.classList.add('img-carousel-comp__subtext--fade-in');
        setTimeout(() => {
            subtext?.classList.remove('img-carousel-comp__subtext--fade-in');
        }, 500);
    }, [selectedImg]);

    return (
        <section
            className='img-carousel-comp'
            style={{
                backgroundColor: `${props.bgColor}`,
                border: `1px solid ${props.color}`,
            }}>
            <div className='img-carousel-comp__row img-carousel-comp__row--carousel'>
                <div className='img-carousel-comp__col img-carousel-comp__col--nav-button'>
                    <a
                        href='#'
                        data-testid='img-carousel-left-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}` }}
                        onClick={(event)=>cycleSelectedImg(event, 'left')}>
                        {'\u2190'}
                    </a>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 1 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <a
                        href='#'
                        data-testid='img-carousel-img1-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={(event)=>handleSelectImage(event, 1, props.images[0])}>
                            <LazyImage
                                src={props?.lqImages && props?.lqImages[0] ? props.lqImages[0] : props.images[0]}
                                alt='exampleImg1'
                                className='img-carousel-comp__img'></LazyImage>
                    </a>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 2 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <a
                        href='#'
                        data-testid='img-carousel-img2-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={(event)=>handleSelectImage(event, 2, props.images[1])}>
                            <LazyImage
                                src={props?.lqImages && props?.lqImages[1] ? props.lqImages[1] : props.images[1]}
                                alt='exampleImg2'
                                className='img-carousel-comp__img'></LazyImage>
                    </a>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 3 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <a
                        href='#'
                        data-testid='img-carousel-img3-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={(event)=>handleSelectImage(event, 3, props.images[2])}>
                            <LazyImage
                                src={props?.lqImages && props?.lqImages[2] ? props.lqImages[2] : props.images[2]}
                                alt='exampleImg3'
                                className='img-carousel-comp__img'></LazyImage>
                    </a>
                </div>
                <div className='img-carousel-comp__col img-carousel-comp__col--nav-button'>
                    <a
                        href='#'
                        data-testid='img-carousel-right-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}` }}
                        onClick={(event)=>cycleSelectedImg(event, 'right')}>
                        {'\u2192'} 
                    </a>
                </div>
            </div>
            <div className='img-carousel-comp__row img-carousel-comp__row--margin-top'>
                <div className='img-carousel-comp__col'>
                    <p className='img-carousel-comp__subtext'>{props.subtext[selectedImg-1]}</p>
                </div>
            </div>
        </section>
    )
};