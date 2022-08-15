import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';


const LandingPage = () => {
    return (
        <div className='main flex justify-center'>
            <div className='mb-20'>
                <div className='text-center'>
                    <h1 className='text-white text-3xl md:text-6xl font-bold'>Welcome to Easy Note</h1>
                    <p className='text-white text-md md:text-2xl font-bold my-5'>One safe place for all your notes</p>
                    <hr />
                </div>
                <div className='flex justify-around mt-10'>
                    <NavLink to="/signin" className="btn bg-green-500 hover:bg-green-700 h-8">Sign In</NavLink>
                    
                    <NavLink to="/signup" className="btn bg-green-500 hover:bg-green-700 h-8">Signup</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;