import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Protected(props) {

    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem('userinfo')) {
            navigate('/register');
        }
    }, []);


    let Cmd = props.component;

    return (

        <Cmd />
    );


}

export default Protected;