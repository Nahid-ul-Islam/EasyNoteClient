import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TitleBar from '../../components/TitleBar/TitleBar';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { updateNote } from '../../app/features/notes/notesSlice';

const UpdateNote = () => {
    const {id} = useParams();
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const notesData = useSelector((state) => state.notesReducer);
    const { isLoading, notes, error } = notesData;
    const note = notes.find((note) => note._id === id);

    const newDate = new Date();
    const date = newDate.getDate(); 
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const updatedDate = date + '/' + month + '/' + year;

    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedContent, setUpdatedContent] = useState(note.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            email: user.email, 
            title: updatedTitle, 
            content: updatedContent, 
            date: updatedDate
        };
        dispatch(updateNote(data));
    };

    return (
        <TitleBar title='Update Your Note Here'>
            {isLoading && <Loading></Loading>}
            {error && <p className='text-red-500'>{Error}</p>}
            {notes &&
                <div className=' flex justify-center'>
                    <form onSubmit={handleSubmit}  className="w-full border border-orange-500 mt-10 rounded">
                        <div className="flex flex-wrap mb-6 mt-8">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input onChange={e => setUpdatedTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="grid-first-name" type="text" name="title" value={updatedTitle}  required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-3">
                                <textarea onChange={e => setUpdatedContent(e.target.value)} rows="20" className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="note" name="note" type="text" value={updatedContent} required />
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap px-3 mb-2">
                            <button className='w-full rounded-md py-2 bg-green-500 hover:bg-green-700' type="submit">Save</button>
                        </div>
                    </form>
                </div>
            }
        </TitleBar>
    );
};

export default UpdateNote;