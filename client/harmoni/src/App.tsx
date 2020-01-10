import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { userService } from './services/UserService';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Pages
import FrontPage from './Components/Pages/frontPage';
import Register from './Components/Pages/register';
import Profile from './Components/Pages/profile';
import ChangeInfo from './Components/Pages/changeInfo';
import Events from './Components/Pages/events';
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
  const [userData, setUserData] = useState<IUserData | undefined>();

  // Get data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    // setEventData(await eventService.getAllEvents());
  }

  const logOut = () => {
    // TODO: SOMETHING WITH JWT TOKEN?...
    setUserData(undefined);
  }

  const logIn = async(email: string) => {
    setUserData(await userService.getUserByEMail(email));
  }

    
  return (
    <Router>
      <Layout userData={userData} logOut={logOut} logIn={logIn}>
        <Switch>
            <Route exact path='/' component={FrontPage}/>
            <Route exact path='/registrer' render={props => <Register {...props} logIn={logIn} />} />
            <Route exact path='/profile/change' component={ChangeInfo} />
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/events/:type' component={Events} />
            <Route exact path='/event/:id' component={Event} />
            <Route exact path='/newevent' component={AddEvent}/>
            <Route component={PageNotFound} />
            
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

