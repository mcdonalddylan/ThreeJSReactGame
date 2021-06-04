import React from 'react';
import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';

function App() {
  return (
    <>
    {/* Nav Bar */}
      <NavBarContainer />
      {/* Browser Router */}
      <BrowserRouter>
        <Switch>
          <Route exact path='/' >
            <ThreeJSHomePage />
          </Route>
          <Route path='/game' >
            <ThreeJSGameContainer />
          </Route>
        </Switch>  
      </BrowserRouter>
    </>
  );
}

export default App;
