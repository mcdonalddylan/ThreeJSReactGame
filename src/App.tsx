import React from 'react';
import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';

function App() {
  return (
    <>
      {/* Browser Router */}
      <BrowserRouter>
        <Switch>
          <Route path={process.env.PUBLIC_URL} >
            <ThreeJSHomePage />
          </Route>
          <Route path='/game' >
            <ThreeJSGameContainer />
          </Route>
        </Switch>  
      </BrowserRouter>
      {/* Nav Bar */}
      <NavBarContainer />
    </>
  );
}

export default App;
