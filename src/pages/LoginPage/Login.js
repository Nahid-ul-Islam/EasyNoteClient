import React, { useRef } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../../components/Loading/Loading';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    let errorElement;
    const emailRef = useRef('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        await signInWithEmailAndPassword(email, password);
    }

    const forgetPassword = async () => {
        const email = emailRef.current.value;
        console.log('email', email);
        if (email) {
            await sendPasswordResetEmail(email);
            alert('Email Sent');
        }
        else {
            alert("Please enter your email");
        }
    }

    if(user) {
        navigate('/mynotes');
    }

    if(loading) {
        return <Loading></Loading>
    }

    if(error) {
        errorElement = <p className='text-red-600'>Error: {error?.message}</p>
    }


    return (
        <div className='bgImage'>
            <div className='flex mx-auto my-auto'>
                <div className=''>
                    <h2 className='text-center text-3xl bg-orange-400 pb-4 pt-2 text-white'>Sign In</h2>
                    <div className=" max-w-md mx-auto">
                        <form onSubmit={handleSubmit} className="bg-opacity-10 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 ">
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" ref={emailRef} name='email' type="email" placeholder="email" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-black text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input className="shadow appearance-none border border-orange-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name='password' type="password" placeholder="******************" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-green-800 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    <input className='w-full' type="submit" value='Sign In' />
                                </button>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <button onClick={forgetPassword}
                                    className="inline-block align-baseline font-bold  text-blue-800 hover:text-blue-900">
                                    Forgot Password?
                                </button>
                                <p>Don't have an account?</p>
                                <Link to='/signup' className="inline-block align-baseline font-bold text-blue-800 hover:text-blue-900">
                                    Register
                                </Link>
                            </div>
                            {errorElement}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;