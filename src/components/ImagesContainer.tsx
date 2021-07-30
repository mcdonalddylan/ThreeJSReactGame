import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './ImagesContainer.scss';

interface IProps {
    images: string[],
    redirectString: string
}

export const ImagesContainer: React.FC<IProps> = (props:IProps) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        setInterval(()=>{
            props.images.forEach((img, ind) => {
                const currentImg = document.getElementById(`img${ind}`);
            })
        },3500);
    });

    return (
        <div className="imgs-container">
            <div className="row justify-content-center">
                <div className="">
                    <div className="img-container">
                        <div className='img'>
                            {props.images.map((imgSrc, index)=>{
                                console.log(imgSrc);
                                return (index%2 === 0 ?
                                    <img key={index} id={`img${index}`} className='img-inner' style={{
                                        animationName: 'imageMoveDown',
                                        animationDelay: `${index*5}s`,
                                        animationIterationCount: 'infinite',
                                        animationDuration: '5s',
                                        zIndex: index+1
                                    }}
                                    src={imgSrc} onClick={()=>setRedirect(true)}/>
                                :
                                    <img key={index} id={`img${index}`} className='img-inner' style={{
                                        animationName: 'imageMoveUp',
                                        animationDelay: `${index*5}s`,
                                        animationIterationCount: 'infinite',
                                        animationDuration: '5s',
                                        zIndex: index+1
                                    }}
                                    src={imgSrc} onClick={()=>setRedirect(true)}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to={props.redirectString}/> : <></>}
        </div>
    )
};