import React, { useState } from 'react';
import { auth, fs, doc, setDoc } from '../Config/Config'; // Import Firestore methods
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        // Use createUserWithEmailAndPassword from Firebase v9+
        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                console.log(credentials);
                // Save user data to Firestore using doc and setDoc
                setDoc(doc(fs, 'Users', credentials.user.uid), {
                    Fullname: fullName,
                    Email: email,
                    Password: password
                }).then(() => {
                    setSuccessMsg('Sign Up Successful, Please Login');
                    setErrorMsg('');
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setTimeout(() => {
                        setSuccessMsg('');
                        navigate('/login');
                    }, 3000);
                }).catch(error => setErrorMsg(error.message));
            })
            .catch((error) => {
                // Map Firebase error codes to user-friendly messages
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setErrorMsg('This email is already in use. Please try logging in or use a different email.');
                        break;
                    case 'auth/invalid-email':
                        setErrorMsg('Invalid email format. Please enter a valid email address.');
                        break;
                    case 'auth/weak-password':
                        setErrorMsg('Weak password. Password should be at least 6 characters.');
                        break;
                    default:
                        setErrorMsg('Something went wrong. Please try again later.');
                }
            });
    };

    return (
        <div className='container'>
            <br /><br />
            <h1>Sign up</h1>
            <hr />
            {successMsg && <>
                <br /><br />
                <div className='success-msg'>{successMsg}</div> 
            </>}
            <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
                <label>Full name</label>
                <input type='text' className='form-control' required
                    onChange={(e) => setFullName(e.target.value)} value={fullName} />
                <br />
                <label>Email</label>
                <input type='email' className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label>Password</label>
                <input type='password' className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br /><br />

                <div className='btn-box'>
                    <span>Already have an account? Login
                        <Link to='/login'> here</Link> </span>
                    <button type='submit' className='btn btn-success btn-md'>SIGN UP</button>
                </div>
            </form>
            {errorMsg && <>
                <br /><br />
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
    );
};
