import React, { useState, useEffect } from 'react';
import './ImageCarousel.scss';
import { viewImg } from '../../utils/internalPageUtils/internalPageUtils';
import { LazyImage } from '../LazyImage/LazyImage';

interface IProps {
    images: string[],
    subtext: string[],
    bgColor: string,
    color: string
}

export const ImageCarousel: React.FC<IProps> = (props:IProps) => {

    const [selectedImg, setSelectedImg] = useState<number>(2);

    const handleSelectImage = (selectedImageNum: number, imageSrc: string) => {
        if (selectedImg === selectedImageNum) {
            viewImg(imageSrc);
        }
        else {
            setSelectedImg(selectedImageNum);
        }
    }

    const cycleSelectedImg = (direction: string) => {
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
                    <button
                        data-testid='img-carousel-left-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}` }}
                        onClick={()=>cycleSelectedImg('left')}>
                        {'\u2190'} 
                    </button>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 1 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <button
                        data-testid='img-carousel-img1-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={()=>handleSelectImage(1, props.images[0])}>
                            <LazyImage src={props.images[0]} alt='exampleImg1' className='img-carousel-comp__img' ></LazyImage>
                    </button>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 2 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <button
                        data-testid='img-carousel-img2-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={()=>handleSelectImage(2, props.images[1])}>
                            <LazyImage src={props.images[1]} alt='exampleImg2' className='img-carousel-comp__img' ></LazyImage>
                    </button>
                </div>
                <div className={`img-carousel-comp__col ${selectedImg === 3 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                    <button
                        data-testid='img-carousel-img3-btn'
                        className='img-carousel-comp__img-button'
                        style={{ color: `${props.color}` }}
                        onClick={()=>handleSelectImage(3, props.images[2])}>
                            <LazyImage src={props.images[2]} alt='exampleImg3' className='img-carousel-comp__img' ></LazyImage>
                    </button>
                </div>
                <div className='img-carousel-comp__col img-carousel-comp__col--nav-button'>
                    <button
                        data-testid='img-carousel-right-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}` }}
                        onClick={()=>cycleSelectedImg('right')}>
                        {'\u2192'} 
                    </button>
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