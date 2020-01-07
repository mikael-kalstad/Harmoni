import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

// Pages
import FrontPage from './Components/Pages/FrontPage';

const Overlay = styled.div`
  position: fixed;
  z-index: 9998;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: none;
`;

const App: React.FC = () => {
  return (
    <Router>
       <Overlay id='overlay'/>

      <Switch>
        <Route exact path='/' component={FrontPage}/>
      </Switch>
    </Router>
  );
}

export default App;
