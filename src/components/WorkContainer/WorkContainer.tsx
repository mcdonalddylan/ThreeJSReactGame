import React, { ReactElement, RefObject, useEffect, useRef, useState } from "react";
import './WorkContainer.scss';
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import loadImg from '../../assets/loadingImages/cc0youtubeload.gif';
import { loadLazyImagesFromObserver } from "../../utils/internalPageUtils/internalPageUtils";

interface IContentLink {
    linkText: string,
    linkUrl: string
}

interface IProps {
    chevronImgSrc: string,
    color: string,
    bgColor: string,
    year: string,
    title: string,
    contentLinks?: IContentLink[],
    content?: ReactElement,
    contentImgs?: string[],
    contentSubtext?: string[],
    playAbility?: 'Nope' | 'Download' | 'Playable'
}

export const WorkContainer: React.FC<IProps> = (props: IProps) => {

    const [showContent, setShowContent] = useState(false);

    const viewImg = (imageSrc: string) => {
        window.open(imageSrc, '_blank');
    }

    const toggleContent = (event: any) => {

        const element: HTMLElement = event.target;
        // Will toggle content if not a link and not an image (exception for chevron img)
        if (element.tagName !== 'A'){
            if(element.tagName === 'IMG' || element.tagName === 'P' ||
            element.tagName === 'LI' || element.tagName === 'BUTTON') {
                if(element.id === 'chev'){
                    setShowContent(!showContent);
                }
            } else {
                setShowContent(!showContent);
            }
        }
    }

    useEffect(() => {
        loadLazyImagesFromObserver('.work-img-zoom');
    }, []);

    return(
        <>
            <div className={`work-container ${showContent ? 'expanded' : ''}`} style={{
                    border: `2px solid ${props.color}`,
                    boxShadow: `0px 0px 15px ${props.color}`,
                    position: 'relative'
                }}
                onClick={toggleContent}
            >
                {showContent && <div className='content-image-bg' 
                    style={{
                        backgroundImage: props.contentImgs ? `url(${props.contentImgs[0]})` : '',
                        opacity: 0.5,
                    }}
                >
                    <div className='content-image-tint'
                        style={{
                            backgroundColor: `${props.bgColor}dd`
                        }}
                    >
                    </div>
                </div>}
                <div className='work-content' >
                    <div className='row justify-content-center'>
                        <div className='col-sm-2 align-self-center'>
                            <h2 className='work-year-text' style={{color: props.color}}>
                                {props.year}
                            </h2>
                        </div>
                        <div className={`${props.playAbility ? 'col-sm-6' : 'col-sm-8'}`}>
                            <h1 className='work-title-text'
                                style={{
                                    color: showContent ? 'white' : props.color,
                                    textShadow: showContent ? `0 0 8px ${'black'}` : ''
                                }}
                            >
                                {props.title}
                            </h1>
                        </div>
                        {props.playAbility &&
                            <div
                                className='col-sm-2'
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                <p style={{color: props.color, margin: 0}} >Playable?</p>
                                <p style={{
                                    color: props.playAbility === 'Playable' ? 'lime' : props.playAbility === 'Download' ? 'yellow' : 'red',
                                    fontWeight: 800,
                                    margin: 0,
                                    textShadow: '0 0 10px black'
                                }}>{props.playAbility}</p>
                            </div>
                        }
                        <div
                            className='col-sm-2 work-img-div'
                            style={{
                                textAlign: 'center',
                                transform: showContent ? 'rotate(180deg)' : ''
                            }}
                        >
                            <img className='work-img' id='chev' src={props.chevronImgSrc} alt='chevron svg' />
                        </div>
                    </div>
                    {showContent ?
                        <>
                            <hr style={{
                                    border: `1px solid ${props.color}`,
                                    backgroundColor: props.color,
                                    marginTop: 20,
                                    marginBottom: 10
                                }}
                            />
                            {props.contentLinks?.map((link, index) => {
                                return (
                                    <div key={index} className='row justify-content-center'>
                                        <div className='col-sm-12' style={{textAlign: 'center'}}>
                                            <a href={link.linkUrl} target={'_blank'}
                                                style={{
                                                    color: props.color,
                                                    textShadow: `0px 0px 10px ${props.color}`
                                                }}
                                                className='work-link'
                                            >
                                                {link.linkText}
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                            <br></br>
                            {props?.contentImgs && props?.contentImgs?.length > 2 && props?.contentSubtext && props?.contentSubtext?.length > 2 && 
                                <ImageCarousel
                                    key={props.title}
                                    images={props.contentImgs}
                                    subtext={props.contentSubtext}
                                    bgColor={props.bgColor}
                                    color={props.color}
                                />}
                            <br></br>
                            <div className='row justify-content-center'>
                                <div className='content-container col-sm-8'
                                    style={{
                                        backgroundColor: `${props.bgColor}`,
                                        border: `1px solid ${props.color}`
                                    }}
                                >
                                    {props.content}
                                </div>
                            </div>
                            <div className='row justify-content-center' style={{marginTop: 20}}>
                            {props.contentImgs ?
                                props.contentImgs.map((imgSrc, index)=>{
                                    return (
                                        <div key={index} className='col-sm-1' onClick={()=>viewImg(imgSrc)}>
                                            <img
                                                data-src={imgSrc}
                                                src={loadImg}
                                                alt={`${props.title}Img${index}`}
                                                style={{overflow: 'hidden', width: '100%'}}
                                                className='work-img-zoom'
                                                loading='lazy'
                                            />
                                        </div>
                                    )
                                }) :
                                null}
                            </div>
                        </> :
                        null}
                </div>
            </div>
        </>
    )
}