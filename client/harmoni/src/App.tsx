import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loginService } from "./services/loginService";
import { userService } from "./services/UserService";

// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import FrontPage from "./Components/Pages/frontPage";
import Register from "./Components/Pages/register";
import Profile from "./Components/Pages/profile";
import Events from "./Components/Pages/events";
import Event from "./Components/Pages/eventPage";
import PageNotFound from "./Components/Pages/pageNotFound";
import Layout from "./Components/layout";
import AddEvent from "./Components/AddEvent/addEvent";

// Authentication component
import Authenticate from "./Components/authenticate";

interface IUserData {
  name: string;
  email: string;
  type: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState();

  // Get data when component mounts
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    console.log("token in app", localStorage.getItem("x-access-token"));
    let res = await loginService.checkToken();
    console.log("res in app", res);
    if (res) {
      setUserData(res["userData"]);
      console.log("updatin!");
    }
  };

  console.log("USER DATA Ah ye!", userData);

  const logOut = () => {
    localStorage.removeItem("x-access-token");
    setUserData(undefined);
  };

  const logIn = async (email: string) => {
    setUserData(await userService.getUserByEMail(email));
  };

  interface IProps {
    component?: any;
    render?: any;
    exact?: boolean;
    path: string;
  }

  // Route with authentication
  const RouteWithAuth = ({ component, render, ...rest }: IProps) => (
    <Authenticate userData={userData} logIn={logIn}>
      <Route {...rest} render={render} component={component} />
    </Authenticate>
  );

  return (
    <Router>
      <Layout userData={userData} logOut={logOut} logIn={logIn}>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route
            exact
            path="/registrer"
            render={props => <Register {...props} logIn={logIn} />}
          />
          <Route exact path="/events/:type" component={Events} />
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/newevent" component={AddEvent} />

          {/* ROUTES WITH AUTHENTICATION */}
          <RouteWithAuth
            exact
            path="/profile/change"
            render={props => <Register userData={userData} />}
          />
          <RouteWithAuth exact path="/profile" component={Profile} />
          {/* <RouteWithAuth exact path='/newevent' component={AddEvent} /> */}

          {/* 404 PAGE NOT FOUND (if not other routes match) */}
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
