import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotes } from '../../app/features/notes/notesSlice';
import Loading from '../../components/Loading/Loading';

const MyNotes = () => {
    const [user] = useAuthState(auth);
    // console.log(user.displayName);

    const [notess, setNotes] = useState([]);


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete!!")) {

        }
    };

    const tt = `Welcome back ${user.displayName}`;

    const notesData = useSelector((state) => state.notesReducer);
    console.log(notesData);
    const { isLoading, notes, error } = notesData;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNotes(user.email));
    }, []);

    return (
        <div>
            <TitleBar title={tt}>
                <NavLink to='/add-note'>
                    <button className="px-2 py-2 rounded-md my-4 bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Create New Note</button>
                </NavLink>
                {isLoading && <Loading></Loading>}
                {error && <p className='text-red-500'>{error}</p>}
                {
                   notes && notes.map(note =>
                        <div key={note._id}>

                            {/* card start */}
                            <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-gray-100 rounded-box mb-2">
                                <div className="collapse-title text-xl font-medium flex justify-between">
                                    <div>{note.title}</div>
                                    <div>
                                        <NavLink to={`/note/${note._id}`} className="px-2 py-2 mr-2 rounded-md bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Edit</NavLink>
                                        <button className="px-2 py-2 rounded-md bg-red-500 hover:bg-red-700 font-semibold text-sm md:text-base" onClick={() => handleDelete(note._id)}>Delete</button>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    {/* card body */}
                                    <div>
                                        <h2 className='font-bold text-lg'>{note.content}</h2>
                                        <h5>Created On - {note.date}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </TitleBar>
        </div>
    );
};

export default MyNotes;