import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


function Login() {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('userinfo')) {
            navigate('/add')
        }

    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    async function login() {

        let item = { email, password };

        let result = await fetch("http://127.0.0.1:8000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(result)
        console.log(result.message)
        console.log(result.status)

        result = await result.json();
        console.warn(result);
        if (result !== 'false' && result) {
            localStorage.setItem('userinfo', JSON.stringify(result));
            navigate('/add');
        }
        else if(!result){
            console.warn('its not correct')
            setError(true);
        }

    }

    return (
        <div>
            <Header inpage='login' />

            <div className='col-md-6 offset-md-3 '>
                <br /><br />
                <Card>
                    <Card.Header>login </Card.Header>
                    <Card.Body>

                        <br />

                        <label className='d-flex p-2'>email:</label>

                        <input className='form-control' type="text" value={email} placeholder='email' onChange={e => setEmail(e.target.value)} />
                        <br />
                        <label className='d-flex p-2'>password:</label>

                        <input className='form-control' type="password" value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
                        <br />
                        <Button onClick={login} variant="primary">login</Button>
                        <br /><br /><br />
                        <Link to='/register' className='text-muted'>or register</Link>
                        {error ?
                            <div>your email or password isnot correct</div>
                            :
                            null
                        }
                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Login;