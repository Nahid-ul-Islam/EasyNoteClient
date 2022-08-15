import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    // console.log("user",user);
    return (
        <div className='bg-orange-400'>
            {
                user ? 
                <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <NavLink to="/" className="btn btn-ghost normal-case font-bold text-sm md:text-xl">Easy Note</NavLink>
                </div>
                <div className="navbar-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 ml-9 md:ml-0 md:w-48" />
                    </div>
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">
                            <li><NavLink to="/mynotes">My Notes</NavLink></li>
                            <li><NavLink to='/'>My Profile</NavLink></li>
                            <li><button onClick={ ()=>  signOut(auth)}>Log Out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            <></>
            // <div className="navbar container mx-auto flex justify-center">
            //     <div>
            //         <NavLink to="/" className="btn btn-ghost normal-case font-bold text-sm md:text-xl">Easy Note</NavLink>
            //     </div>
            // </div>
            }
        </div>
    );
};

export default Header;