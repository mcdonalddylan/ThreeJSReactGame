import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import './ImagesContainer.scss';

interface IProps {
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const [imgGrow, setImgGrow] = useState(false);
    const [overlayImgSrc, setOverlayImgSrc] = useState('');

    useEffect(()=>{

        console.log('imgGrow: ', imgGrow);
        if(imgGrow){
            document.body.style.position = 'relative';
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.position = 'static';
            document.body.style.overflowY = 'scroll';
        }
    });

    const overlayImage = (event: any) => {

        const image: HTMLImageElement = event.target;
        setOverlayImgSrc(image.src);
        setImgGrow(!imgGrow);
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

            {imgGrow ? 
            <div className='overlay'>
                <img alt='image' className='img-overlay' id='big-img'
                src={overlayImgSrc} 
                onClick={()=>setImgGrow(!imgGrow)}/>
            </div> 
            : 
            <></>}
        </div>
    )
}