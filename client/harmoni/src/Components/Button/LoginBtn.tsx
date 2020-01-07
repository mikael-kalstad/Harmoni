import React, { useState } from 'react';
import Login from '../Login';
import Button from './Button';



const LoginBtn = () => {
    const [display, setDisplay] = useState(false);
    const toggleDisplay = () => {
        setDisplay(!display);

        let overlay = document.getElementById('overlay');
        if (overlay !== null)
            overlay.style.display = !display ? 'block' : 'none';
    }


    return (
        <>
            <Button onClick={toggleDisplay} solid={true}>Logg inn</Button>

            {/* Only display login popup if display(state) is true */}
            {display && <Login toggle={toggleDisplay} />}
        </>
    );
}

export default LoginBtn;