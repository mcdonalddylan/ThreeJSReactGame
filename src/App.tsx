import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '.';
import { setOverlay } from './redux/imgActions';
import { useEffect } from 'react';
import { NOTFOUND } from 'dns';
import { ThreeJSErrorPage } from './components/ThreeJSErrorPage';

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
    {/* Hash Router (So that you can navigate on github pages) */}
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ThreeJSHomePage} />
          <Route exact path='/web' component={ThreeJSGameContainer} />
          <Route exact path='/game' component={ThreeJSGameContainer} />
          <Route exact path='/art' component={ThreeJSGameContainer} />
          {/* Error Page */}
          <Route component={ThreeJSErrorPage} /> 
        </Switch>  
      </HashRouter>
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
