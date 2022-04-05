import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';


function Register() {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('userinfo')) {
            navigate('/add')
        }

    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');


    async function signUp() {
        let item = { name, password, email }

        let response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
console.log(response.status)
        if(response.status === 201){

            let result =await response.json();
            localStorage.setItem('userinfo', JSON.stringify(result));
            navigate('/add');

        }
        else if(response.status === 422){

            let result =await response.json();
            console.warn(result)
            console.warn(result.errors)
            setErrors(result.errors);
        }
   

    }

    return (
        <div>
            <Header inpage='reg' />
            <div className='col-md-6 offset-md-3 '>
                <br /><br />
                <Card>
                    <Card.Header>sign up</Card.Header>
                    <Card.Body>
                        <br />
                        <label className='d-flex p-2'>name:</label>

                        <input className='form-control' type="text" value={name} placeholder='name' onChange={e => setName(e.target.value)} />
                        <br />
                        {errors.name 
                        ? 
                        <div className='warning-t'>{errors.name}
                        
                        </div>
                        
                        : 
                        null}
                        
                        <label className='d-flex p-2'>password:</label>

                        <input className='form-control' type="password" value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
                        <br />
                        {errors.password 
                        ? 
                        <div className='warning-t'>{errors.password}
                        
                        </div>
                        
                        : 
                        null}
                        
                        <label className='d-flex p-2'>email:</label>

                        <input className='form-control' type="text" value={email} placeholder='email' onChange={e => setEmail(e.target.value)} />
                        <br />
                        {errors.email 
                        ? 
                        <div className='warning-t'>{errors.email}
                        
                        </div>
                        
                        : 
                        null}
                        
                        <Button className='mt-4' onClick={signUp} variant="primary">sign up</Button>
                        <br /><br /><br />
                        <Link to='/login' className='text-muted'>or login</Link>
                        <br />
                        
                    </Card.Body>
                </Card>

            </div>

        </div>

    )
}

export default Register;