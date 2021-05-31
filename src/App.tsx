import React from 'react';
import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThreeJSHomePage } from './components/ThreeJSHomePage';

function App() {
  return (
    <>
      <header>

      </header>
      <body>
        <BrowserRouter>
          <Switch>
            <Route path='/'>
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
