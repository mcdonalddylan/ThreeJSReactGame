import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '.';
import { setOverlay } from './redux/imgActions';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  const imgState: any = useSelector<IState>(store=>store.imageState);

  useEffect(()=>{
    if(imgState.canOverlay){
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  });

  console.log('imgState: ', imgState);

  return (
    <>
      {/* Browser Router */}
      <BrowserRouter>
        <Switch>
          <Route path={process.env.PUBLIC_URL} component={ThreeJSHomePage} />
          <Route path={`${process.env.PUBLIC_URL}/web`} component={ThreeJSGameContainer} />
          <Route path={`${process.env.PUBLIC_URL}/game`} >
            <ThreeJSGameContainer />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/art`} >
            <ThreeJSGameContainer />
          </Route>
        </Switch>  
      </BrowserRouter>
      {/* Nav Bar */}
      <NavBarContainer />

      {imgState.canOverlay ?
        <div className='overlay'>
          <img alt='image' className='img-overlay' id='big-img'
          src={imgState.src}
          onClick={()=>dispatch(setOverlay({canOverlay: false, src: ''}))}/>
        </div> 
        : 
        <></>}
    </>
  );
}

export default App;
