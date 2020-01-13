/**
 * Authentication component for checking if user is logged and if token is valid
 *
 * This component should be wrapper around the component
 * which should only be shown when user is authenticated.
 *
 * --- Example: ---
 * <Authenticate>
 *      <UserInfo />
 * </Authenticate>
 */

import React, { useState, useEffect } from "react";
import { loginService } from "../services/loginService";
import Loading from "./loading";
import OutlineButton from "./Button/outlineButton";
import LoginBtn from "./Button/loginBtn";
import WarningInfo from "./Pages/warningInfo";

interface IProps {
  children: any;
  userData: any;
  logIn: Function;
}

const Authenticate = (props: IProps) => {
  const [auth, setAuth] = useState(false);
  const [deniedAccess, setDeniedAccess] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    authenticate();
    console.log("token: ", localStorage.getItem("x-access-token"));
  }, []);

  const authenticate = async () => {
    // Check jwt token
    let res: any;
    res = await loginService.checkToken();
    console.log("res: ", res);

    if (res instanceof Error) {
      setConnectionError(true);
      return;
    } else if (res && res.status === 401) {
      setDeniedAccess(true);
      return;
    } else if (!props.userData) {
      setDeniedAccess(true);
    } else {
      setAuth(true);
    }

    // else if(props.userData)
    //     setUserData(await userService.getUserById(props.userData[0]['user_id']));
  };

  // Connection error
  if (connectionError)
    return (
      <WarningInfo
        title="Noe feil skjedde"
        underTitle="Sjekk internett tilkoblingen"
        text="Det skjedde noe feil. Sjekk internett tilkoblingen din og prøv på nytt."
        btn1_component={
          <OutlineButton
            width="140px"
            height="60px"
            solid={true}
            onClick={() => window.location.reload(false)}
          >
            Prøv igjen
          </OutlineButton>
        }
      />
    );
  // User not logged in
  else if (deniedAccess)
    return (
      <WarningInfo
        title="Ingen tilgang"
        underTitle="Logg inn eller lag en konto"
        text=" Du har ikke tilgang til denne siden. For å nå denne siden må du først
logge inn eller lage en konto."
        btn1_component={
          <LoginBtn width="140px" height="60px" logIn={props.logIn} />
        }
        btn2_component={
          <OutlineButton width="140px" height="60px" to="/registrer">
            Registrer
          </OutlineButton>
        }
      />
    );
  // User authenticated
  else if (auth) return props.children;
  // Loading screen as default
  else return <Loading />;
};

// logIn={props.logIn}
export default Authenticate;
