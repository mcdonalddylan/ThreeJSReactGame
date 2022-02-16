import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainerWithRouter } from './components/NavBarContainer';
import { ThreeJSErrorPage } from './components/ThreeJSErrorPage';
import { ThreeJSWebPage } from './components/ThreeJSWebPage';
import { ThreeJGamePage } from './components/ThreeJSGamePage';
import { ThreeJSArtPage } from './components/ThreeJSArtPage';

function App() {

  return (
    <>
    {/* Hash Router (So that you can navigate on github pages) */}
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ThreeJSHomePage} />
          <Route exact path='/web' component={ThreeJSWebPage} />
          <Route exact path='/game' component={ThreeJGamePage} />
          <Route exact path='/art' component={ThreeJSArtPage} />
          {/* Error Page */}
          <Route component={ThreeJSErrorPage} /> 
        </Switch>
        
        {/* Nav Bar */}
        <NavBarContainerWithRouter />
      </HashRouter>
      
    </>
  );
}

export default App;
