import React from 'react';
import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';
import { NavBarContainer } from './components/NavBarContainer';

function App() {
  return (
    <>
      <header>
        <NavBarContainer />
      </header>
      <body>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <ThreeJSHomePage />
            </Route>
            <Route path='/game'>
              <ThreeJSGameContainer />
            </Route>
          </Switch>  
        </BrowserRouter>
      </body>
      <footer>

      </footer>
    </>
  );
}

export default App;
