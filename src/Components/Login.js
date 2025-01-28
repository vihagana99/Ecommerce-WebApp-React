import React, { useState } from 'react';
import { auth } from '../Config/Config'; // Import Firestore methods
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setErrorMsg('');
                setSuccessMsg('Login Successful');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/'); // Redirect to home page
                }, 3000);
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-credential':
                        setErrorMsg('Invalid email or password. Please try again.');
                        break;
                    case 'auth/invalid-email':
                        setErrorMsg('Invalid email format.');
                        break;
                    default:
                        setErrorMsg('Something went wrong. Please try again later.');
                }
            });
    };
    

    return (
        <div className='container'>
            <br /><br />
            <h1>Login</h1>
            <hr />
            {successMsg && <div className='success-msg'>{successMsg}</div>}
            <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
                <label>Email</label>
                <input type='email' className='form-control' required 
                onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label>Password</label>
                <input type='password' className='form-control' required 
                onChange={(e) => setPassword(e.target.value)} value={password} />
                <br /><br />
                <div className='btn-box'>
                    <span>Don't have an account? Sign up <Link to='/signup'>here</Link></span>
                    <button type='submit' className='btn btn-success btn-md'>LOGIN</button>
                </div>
            </form>
            {errorMsg && <div className='error-msg'>{errorMsg}</div>}
        </div>
    );
};
