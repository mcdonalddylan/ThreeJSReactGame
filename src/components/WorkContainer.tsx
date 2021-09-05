import { ReactElement, useState } from "react"
import './WorkContainer.scss';

interface IProps {
    chevronImgSrc: string,
    color: string,
    bgColor: string,
    year: string,
    title: string,
    content?: ReactElement
}

export const WorkContainer: React.FC<IProps> = (props: IProps) => {

    const [showContent, setShowContent] = useState(false);

    return(
        <div className='work-container' style={{
                backgroundColor: props.bgColor,
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
                    style={{textAlign: 'center'}}
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
                    <div className='row justify-content-center'>
                        <div className='col-sm-10'>
                            {props.content}
                        </div>
                    </div>
                </> :
                null}
        </div>
    )
}