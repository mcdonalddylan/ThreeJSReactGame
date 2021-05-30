import React from 'react';
import logo from './logo.svg';
import { ThreeJSGameContainer } from '../src/components/ThreeJSGameContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <header>

      </header>
      <body>
        <BrowserRouter>
          <Switch>
            <Route path='/'>
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
