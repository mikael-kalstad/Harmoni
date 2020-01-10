import React, { useState, useEffect } from 'react';
import Register from './register';
import { loginService } from '../../services/loginService';

const ChangeInfo = (props: {jwt:string}) => {
    const [data, setData] = useState();

    useEffect(() => {
        // let res = await loginService.updateToken
    }, []);

    return <Register />
}

export default ChangeInfo;