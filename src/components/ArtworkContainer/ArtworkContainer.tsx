import React, { ReactElement, useEffect, useState } from "react"
import '../WorkContainer/WorkContainer.scss';
import loadImg from '../../assets/loadingImages/cc0youtubeload.gif';
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
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
    mobileAspectRatio: boolean,
    contentLinks?: IContentLink[],
    content?: ReactElement,
    contentImgs?: string[],
    contentSubtext?: string[]
}

export const ArtworkContainer: React.FC<IProps> = (props: IProps) => {

    const [showContent, setShowContent] = useState(false);

    const viewImg = (imageSrc: string) => {
        window.open(imageSrc, '_blank');
    }

    const toggleContent = (event: any) => {

        const element: HTMLElement = event.target;
        // Will toggle content if not a link and not an image (exception for chevron img)
        if (element.tagName !== 'A'){
            if(element.tagName === 'IMG' || element.tagName === 'BUTTON'){
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
            <div className={`${props.mobileAspectRatio ? 'col-12' : 'col-5'} work-container ${showContent ? 'expanded' : ''}`} style={{
                    border: `2px solid ${props.color}`,
                    boxShadow: `0px 0px 15px ${props.color}`,
                    position: 'relative'
                }}
                onClick={toggleContent}
            >
                <div className='content-image-bg' 
                    style={{
                        backgroundColor: `black`,
                        backgroundImage: props.contentImgs ? `url(${props.contentImgs[0]})` : '',
                        opacity: showContent ? 0.9 : 0.3,
                    }}
                >
                    <div className='content-image-tint'
                        style={{
                            backgroundColor: `${props.bgColor}dd`
                        }}
                    >
                    </div>
                </div>
                <div className='work-content' >
                    <div className='row justify-content-center'>
                        <div className='col-sm-2 align-self-center'>
                            <h2 className='work-year-text' style={{color: props.color}}>
                                {props.year}
                            </h2>
                        </div>
                        <div className={`'col-sm-8'`}>
                            <h1 className='work-title-text'
                                style={{
                                    color: showContent ? 'white' : props.color,
                                    textShadow: showContent ? `0 0 8px ${'black'}` : ''
                                }}
                            >
                                {props.title}
                            </h1>
                        </div>
                        <div
                            className='col-sm-2 work-img-div'
                            style={{
                                textAlign: 'center',
                                transform: showContent ? 'rotate(180deg)' : ''
                            }}
                        >
                            <img className='work-img' id='chev' src={props.chevronImgSrc} alt='chevron svg' loading='lazy'/>
                        </div>
                    </div>
                    {showContent &&
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
                                    <div className='row justify-content-center'>
                                        <div className='col-sm-12' style={{textAlign: 'center'}}>
                                            <a key={index} href={link.linkUrl}
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
                            <div className='row justify-content-center' style={{marginTop: 20}}>
                                {props?.contentImgs &&
                                    props.contentImgs.map((imgSrc, index)=>{
                                        return (
                                            <div key={index} className='col-sm-2' onClick={()=>viewImg(imgSrc)}>
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
                                    })}
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}