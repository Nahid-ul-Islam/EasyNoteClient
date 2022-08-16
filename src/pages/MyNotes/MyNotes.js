import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useSelector, useDispatch } from 'react-redux';
import { delNote, loadNotes } from '../../app/features/notes/notesSlice';
import Loading from '../../components/Loading/Loading';

const MyNotes = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const notesData = useSelector((state) => state.notesReducer);
    const searchData = useSelector((state) => state.searchReducer.value);


    console.log(notesData);
    const { isLoading, notes, error } = notesData;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete!!")) {
            dispatch(delNote(id));
            setFlag(!flag);
        }
    };

    useEffect(() => {
        dispatch(loadNotes(user.email));
    }, []);

    const pageTitle = `Welcome ${user.displayName}`;

    return (
        <div>
            <TitleBar title={pageTitle}>
                <NavLink to='/add-note'>
                    <button className="px-2 py-2 rounded-md my-4 bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Create New Note</button>
                </NavLink>
                {isLoading && <Loading></Loading>}
                {error && <p className='text-red-500'>{error}</p>}
                {
                    notes && notes.filter((searchNote) => {
                        if (searchNote === "") {
                            return searchNote
                        } else if (searchNote.title.toLowerCase().includes(searchData)) {
                            return searchNote
                        }
                    }).map(note =>
                        <div key={note._id}>

                            {/* card start */}
                            <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-gray-100 rounded-box mb-2">
                                <div className="collapse-title text-xl font-medium flex justify-between">
                                    <div>{note.title}</div>
                                    <div>
                                        <Link to={`/update-note/${note._id}`} className="px-2 py-2 mr-2 rounded-md bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Edit</Link>
                                        <button className="px-2 py-2 rounded-md bg-red-500 hover:bg-red-700 font-semibold text-sm md:text-base" onClick={() => handleDelete(note._id)}>Delete</button>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    {/* card body */}
                                    <div>
                                        <h2 className='font-semibold text-lg'>{note.content}</h2>
                                        <p><small>Created On - {note.date}</small></p>
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