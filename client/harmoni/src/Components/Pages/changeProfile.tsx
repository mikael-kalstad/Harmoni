import React, { useEffect, useState } from 'react';
import { userService } from '../../services/UserService';
import { loginService } from '../../services/loginService';
import { Redirect } from 'react-router-dom';
import Register from './register';

const ChangeProfile = () => {
    const [redirect, setRedirect] = useState(false);
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (!authentiCate()) {
            setRedirect(true);
            return;
        }
    }, []);

    const authentiCate = async() => {
        // Check jwt token
        let res = await loginService.checkToken()
        console.log("AUTHENTICATE", res);
    }

    const fetchUserById = async(id:number) => {
        setUserData(await userService.getUserById(id));
    }

    if (redirect) return <Redirect to='/'/>

    if (userData)
        return <Register userData={userData} />

    return <h1>Hackerman?</h1>
}

export default ChangeProfile;