import React, { ReactElement, SyntheticEvent, useState } from "react"
import './WorkContainer.scss';

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
    contentImgs?: string[]
}

export const WorkContainer: React.FC<IProps> = (props: IProps) => {

    const [showContent, setShowContent] = useState(false);

    const viewImg = (imageSrc: string) => {
        
        window.open(imageSrc, '_target');
    }

    const toggleContent = (event: any) => {

        const element: HTMLElement = event.target;
        // Will toggle content if not a link and not an image (exception for chevron img)
        if (element.tagName !== 'A'){
            if(element.tagName === 'IMG'){
                if(element.id === 'chev'){
                    setShowContent(!showContent);
                }
            } else {
                setShowContent(!showContent);
            }
            
        }
    }

    return(
        <>
            <div className={`work-container ${showContent ? 'expanded' : ''}`} style={{
                    border: `2px solid ${props.color}`,
                    boxShadow: `0px 0px 15px ${props.color}`,
                    position: 'relative'
                }}
                onClick={toggleContent}
            >
                <div style={{
                        backgroundImage: props.contentImgs ? `url(${props.contentImgs[0]})` : '',
                        backgroundSize: '110%',
                        backgroundPositionY: 'bottom',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        margin: -20,
                        opacity: showContent ? 0.9 : 0.7,
                        transition: '0.4s all ease'
                    }}
                >
                    <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            margin: -20,
                            backgroundColor: props.contentImgs && !showContent ? `${props.bgColor}ee` : `${props.bgColor}ee`,
                            backgroundSize: '110%',
                            zIndex: 1,
                            transition: '0.4s all ease'
                        }}
                    >
                    </div>
                </div>
                <div style={{
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <div className='row justify-content-center'>
                        <div className='col-sm-2 align-self-center'>
                            <h2 className='work-year-text' style={{color: props.color}}>
                                {props.year}
                            </h2>
                        </div>
                        <div className='col-sm-8'>
                            <h1 className='work-title-text' style={{color: props.color}}>
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
                            <img className='work-img' id='chev' src={props.chevronImgSrc} alt='chevron svg'/>
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
                            <div className='row justify-content-center'>
                                <div className='content-container col-sm-6'
                                    style={{
                                        backgroundColor: `${props.bgColor}`,
                                        WebkitFilter: 'saturate(0.4)'
                                    }}
                                >
                                    {props.content}
                                </div>
                            </div>
                            <div className='row justify-content-center' style={{marginTop: 15}}>
                            {props.contentImgs ?
                                props.contentImgs.map((imgSrc, index)=>{
                                    return (
                                        <div className='col-sm-1' onClick={()=>viewImg(imgSrc)}>
                                            <img
                                                src={imgSrc}
                                                alt={`${props.title}Img${index}`}
                                                style={{overflow: 'hidden', width: '100%'}}
                                                className='work-img-zoom'
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