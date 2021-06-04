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
    console.log(`quality: `, quality);

    return(
        <div className="container" style={{margin: "0 auto", position: "fixed"}}>
            <div className="row justify-content-center" style={{ zIndex: 3 }}>
                <div className="col-3">
                    <button onClick={()=>{
                        if(quality === 1){
                            dispatch(setQuality(2.5));
                        } else {
                            dispatch(setQuality(1));
                        }
                    }} className="qual-btn" >Quality</button>
                </div>               
            </div>
        </div>
    )
}