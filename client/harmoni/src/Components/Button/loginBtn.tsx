import React, { useState } from 'react';
import Login from '../login';
import OutlineButton from './outlineButton';

const LoginBtn = (props:any) => {
    const [display, setDisplay] = useState(false);
    
    const toggleDisplay = () => {
        setDisplay(!display);
    }

    return (
        <>
            <OutlineButton onClick={toggleDisplay} solid={true}>Logg inn</OutlineButton>

            {/* Only display login popup if display(state) is true */}
            {display && <Login logIn={props.logIn} toggle={toggleDisplay} />}
        </>
    );
}

export default LoginBtn;