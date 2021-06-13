import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../redux/imgActions';
import './ImagesContainer.scss';

interface IProps {
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const dispatch = useDispatch();

    const overlayImage = (event: any) => {

        const image: HTMLImageElement = event.target;
        dispatch(setOverlay({canOverlay: true, src: image.src}));
    };

    return (
        <div className="img-container">
            <div className="row justify-content-center">
                <div className="col-sm-4 text-center imgs">
                    <img className='imgs-shrink' src={props.image1} onClick={overlayImage}/>
                </div>
                <div className='col-sm-4 text-center imgs'>
                    <img className='imgs-shrink' src={props.image2} onClick={overlayImage}/>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-sm-4 imgs">
                    <img className='imgs-shrink' src={props.image3} onClick={overlayImage}/>
                </div>
                <div className='col-sm-4 imgs'>
                    <img className='imgs-shrink' src={props.image4} onClick={overlayImage}/>
                </div>
            </div>
        </div>
    )
}