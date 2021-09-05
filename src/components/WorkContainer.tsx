import { ReactElement, useState } from "react"
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

    return(
        <div className='work-container' style={{
                backgroundColor: showContent ? props.bgColor : `${props.bgColor}dd`,
                border: `2px solid ${props.color}`,
                boxShadow: `0px 0px 15px ${props.color}`
            }}
        >
            <div className='row justify-content-center'>
                <div className='col-sm-2'>
                    <h1 className='work-year-text' style={{color: props.color}}>
                        {props.year}
                    </h1>
                </div>
                <div className='col-sm-8'>
                    <h1 className='work-title-text' style={{color: props.color}}>
                        {props.title}
                    </h1>
                </div>
                <div
                    className='col-sm-2'
                    onClick={()=>setShowContent(!showContent)}
                    style={{
                        textAlign: 'center',
                        transform: showContent ? 'rotate(180deg)' : ''
                    }}
                >
                    <img className='work-img' src={props.chevronImgSrc} alt='chevron svg'/>
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
                        <div className='col-sm-6'>
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
                                    />
                                </div>
                            )
                        }) :
                        null}
                    </div>
                    
                </> :
                null}
        </div>
    )
}