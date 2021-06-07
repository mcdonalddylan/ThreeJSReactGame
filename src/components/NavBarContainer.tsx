import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuality } from '../redux/navActions';
import '../components/NavBarContainer.scss';
import { IState } from '..';

interface IProps {

}

export const NavBarContainer: React.FC<IProps> = (props:IProps) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    const dispatch = useDispatch();
    console.log(process.env.PUBLIC_URL);

    return(
        <div className="container position-fixed" style={{ left: '50%', transform: 'translate(-50%, 0)', zIndex: 10 }}>
            <div className="row justify-content-center" >
                <div className="col-sm-3 center-block" >
                    <button onClick={()=>{
                        if(quality === 1){
                            window.scrollTo(0,0);
                            dispatch(setQuality(2.5));
                        } else {
                            window.scrollTo(0,0);
                            dispatch(setQuality(1));
                        }
                    }} className="qual-btn" >Quality</button>
                </div>               
            </div>
        </div>
    )
}