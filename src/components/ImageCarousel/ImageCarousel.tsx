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

    const [selectedImg, setSelectedImg] = useState<number>(1);

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

        const maxImgs = props.images.length;
        if (selectedImg === 1 && direction === 'left') {
            setSelectedImg(maxImgs);
        } else if (direction === 'left') {
            setSelectedImg(selectedImg-1);
        } else if (selectedImg === maxImgs && direction === 'right') {
            setSelectedImg(1);
        } else if (direction === 'right') {
            setSelectedImg(selectedImg+1);
        }
    }

    // Triggers the fade in effect for the image subtext
    useEffect(() => {
        const subtext = document.querySelector('.img-carousel-comp__subtext');
        const selectedImgElements: NodeListOf<Element> = document.querySelectorAll('.img-carousel-comp__enlarged-img');
        if (selectedImgElements.length > 0) {
            Array.from(selectedImgElements).forEach((imgEl) => {
                imgEl.classList.add('img-carousel-comp__enlarged-img--hidden');
            });
            selectedImgElements[selectedImg-1]?.classList.remove('img-carousel-comp__enlarged-img--hidden');
            selectedImgElements[selectedImg-1]?.classList.add('img-carousel-comp__enlarged-img--fade-in');
        }
        subtext?.classList.add('img-carousel-comp__subtext--fade-in');
        setTimeout(() => {
            subtext?.classList.remove('img-carousel-comp__subtext--fade-in');
            selectedImgElements[selectedImg-1]?.classList.add('img-carousel-comp__enlarged-img--fade-in');

        }, 500);
    }, [selectedImg]);

    return (
        <section
            className='img-carousel-comp'
            style={{
                backgroundColor: `${props.bgColor}`,
                border: `1px solid ${props.color}`,
            }}>
            <div className='img-carousel-comp__row img-carousel-comp__row--enlarged-img'>
                <div className='img-carousel-comp__col'>
                    <a
                        href='#'
                        data-testid='img-carousel-enlarged-button'
                        className='img-carousel-comp__enlarged-button'
                        onClick={(event)=>handleSelectImage(event, selectedImg, props.images[selectedImg-1])}>
                        {props.images.map((image, index) => {
                            return (
                                <LazyImage
                                    key={index}
                                    id={'englared-img'.concat(index.toString())}
                                    src={props?.lqImages && props?.lqImages[index] ? props.lqImages[index] : image}
                                    alt='enlargedImg'
                                    className='img-carousel-comp__enlarged-img img-carousel-comp__enlarged-img--hidden'></LazyImage>
                            )}
                        )}  
                    </a>
                </div>
            </div>
            <div className='img-carousel-comp__row img-carousel-comp__row--carousel'>
                <div className='img-carousel-comp__col img-carousel-comp__col--nav-button'>
                    <a
                        href='#'
                        data-testid='img-carousel-left-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}`, border: `1px solid ${props.color}` }}
                        onClick={(event)=>cycleSelectedImg(event, 'left')}>
                        {'\u2190'}
                    </a>
                </div>
                <div className='img-carousel-comp__col'>
                    <div className='img-carousel-comp__row img-carousel-comp__row--justify-left'>
                        {props.images.map((image, index) => {
                                return (
                                    <div key={index} className={`img-carousel-comp__col ${selectedImg === index+1 ? 'img-carousel-comp__col--img-button-selected' : 'img-carousel-comp__col--img-button-unselected'}`}>
                                        <a
                                            href='#'
                                            data-testid={'img-carousel-img'.concat((index+1).toString()).concat('-btn')}
                                            className='img-carousel-comp__img-button'
                                            style={{ color: `${props.color}` }}
                                            onClick={(event)=>handleSelectImage(event, index+1, image)}>
                                                <LazyImage
                                                    src={props?.lqImages && props?.lqImages[index] ? props.lqImages[index] : image}
                                                    alt={'exampleImg'.concat((index+1).toString())}
                                                    className='img-carousel-comp__img'></LazyImage>
                                        </a>
                                    </div>
                                )}
                            )}
                    </div>
                </div>

                <div className='img-carousel-comp__col img-carousel-comp__col--nav-button'>
                    <a
                        href='#'
                        data-testid='img-carousel-right-btn'
                        className='img-carousel-comp__nav-button'
                        style={{ color: `${props.color}`, border: `1px solid ${props.color}` }}
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
