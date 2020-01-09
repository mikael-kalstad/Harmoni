import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { eventService } from './services/EventService';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Pages
import FrontPage from './Components/Pages/frontPage';
import Register from './Components/Pages/register';
import Profile from './Components/Pages/profile';
import Event from './Components/Pages/eventPage';
import PageNotFound from './Components/Pages/pageNotFound';
import Layout from './Components/layout';
import AddEvent from './Components/AddEvent/addEvent';

interface IUserData {
  name: string;
  email: string;
  type: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | undefined>({'email':'test@mail.com', 'name': 'Bård Johansen', 'type':'artist'});

  // Get data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    setEventData(await eventService.getAllEvents());
  }

  const logOut = () => {
    // TODO: SOMETHING WITH JWT TOKEN?...
    setUserData(undefined);
  }
    
  return (
    <Router>
      <Layout userData={userData} logOut={logOut}>
        <Switch>
            <Route exact path='/' component={FrontPage} data={eventData}/>
            <Route exact path='/registrer' component={Register}/>
            <Route exact path='/profile' component={Profile}/>
            <Route path='/event/:id' component={Event} data={eventData}/>
            <Route exact path='/newevent' component={AddEvent} data={eventData}/>
            <Route component={PageNotFound} />
            
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

