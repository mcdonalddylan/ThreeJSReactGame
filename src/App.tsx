import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePageContainer } from './components/HomePageContainer/HomePageContainer';
import { NavBarContainer } from './components/NavBarContainer/NavBarContainer';
import { ErrorPageContainer } from './components/ErrorPageContainer/ErrorPageContainer';
import { WebPageContainer } from './components/WebPageContainer/WebPageContainer';
import { GamePageContainer } from './components/GamePageContainer/GamePageContainer';
import { ArtPageContainer } from './components/ArtPageContainer/ArtPageContainer';
import './App.scss';

export const App = () => {

  useEffect(() => {
    // Should display the environment only once upon starting the app
    console.log('Current environment: ', process.env.REACT_APP_TEST_SECRET);
  }, []);
  
  return (
    <>
    {/* Hash Router (So that you can navigate on github pages) */}
      <HashRouter
        basename={'/'}
      >
        <Routes>
          <Route path='/' element={<HomePageContainer />} />
          <Route path='/web' element={<WebPageContainer />} />
          <Route path='/game' element={<GamePageContainer />} />
          <Route path='/art' element={<ArtPageContainer />} />
          {/* Error Page */}
          <Route path='/*' element={<ErrorPageContainer />} />
        </Routes>
        
        {/* Nav Bar */}
        <NavBarContainer />
      </HashRouter>
    </>
  );
}

export default App;
