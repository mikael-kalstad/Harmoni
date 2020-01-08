import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Pages
import FrontPage from './Components/Pages/frontPage';
import Register from './Components/Pages/register';
import PageNotFound from './Components/Pages/pageNotFound';



const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={FrontPage}/>
        <Route exact path='/registrer' component={Register}/>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
