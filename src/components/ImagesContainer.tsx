import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './ImagesContainer.scss';
import './HomePage.scss';

interface IProps {
    images: string[],
    redirectString: string
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const [redirect, setRedirect] = useState(false);
    const IMAGE_LOOP_TIMING_SECONDS = 3;

    const loopImages = () => {
        let counter = 0;
        const run = setInterval(()=>{
            console.log(counter);
            if (counter === 0){
                const previousImage = document.getElementById(`img${props.images.length-1}`);
                if(previousImage) previousImage.style.display = 'none';
                const currentImage = document.getElementById(`img${counter}`);
                if (currentImage) currentImage.style.display = 'block';

                counter++;
            } else if (counter < props.images.length){

                const previousImage = document.getElementById(`img${counter-1}`);
                if(previousImage) previousImage.style.display = 'none';
                const currentImage = document.getElementById(`img${counter}`);
                if (currentImage) currentImage.style.display = 'block';

                counter++;
            } else {
                clearInterval(run);
            }
        },IMAGE_LOOP_TIMING_SECONDS*1000);
        counter = 0;
    }

    useEffect(()=>{
        loopImages();
    });

    return (
        <div className="imgs-container">
            <div className="row justify-content-center">
                <div className="">
                    <div className="img-container">
                        <div className='img'>
                            {props.images.map((imgSrc, index)=>{
                                console.log(imgSrc);
                                return (
                                    <img key={index} id={`img${index}`} className='img-inner' style={{
                                        animationName: 'imageMoveDown',
                                        animationTimingFunction: 'ease',
                                        animationIterationCount: 'infinite',
                                        animationDuration: `${IMAGE_LOOP_TIMING_SECONDS}s`,
                                        zIndex: index+1
                                    }}
                                    src={imgSrc} onClick={()=>setRedirect(true)}/>
                                )
                                // return (index%2 === 0 ?
                                //     <div className='img-display' id={`display${index}`}>
                                //         <img key={index} id={`img${index}`} className='img-inner' style={{
                                //             animationName: 'imageMoveDown',
                                //             animationDelay: `${index*5}s`,
                                //             animationTimingFunction: 'ease',
                                //             animationIterationCount: 'infinite',
                                //             animationDuration: '3s',
                                //             zIndex: index+1
                                //         }}
                                //         src={imgSrc} onClick={()=>setRedirect(true)}/>
                                //     </div>
                                // :
                                //     <img key={index} id={`img${index}`} className='img-inner' style={{
                                //         animationName: 'imageMoveUp',
                                //         animationDelay: `${index*5}s`,
                                //         animationIterationCount: 'infinite',
                                //         animationDuration: '5s',
                                //         zIndex: index+1
                                //     }}
                                //     src={imgSrc} onClick={()=>setRedirect(true)}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to={props.redirectString}/> : <></>}
        </div>
    )
};