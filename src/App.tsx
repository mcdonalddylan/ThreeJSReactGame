import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';
import { ThreeJSErrorPage } from './components/ThreeJSErrorPage';

function App() {

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
    </>
  );
}

export default App;
