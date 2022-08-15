import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../../app/features/notes/notesSlice';
import TitleBar from '../../components/TitleBar/TitleBar';
import auth from '../../firebase.init';

const AddNote = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const noteDate = date + '/' + month + '/' + year;


    const handleSubmit = (event) => {
        event.preventDefault();
        const email = user.email;
        const title = event.target.title.value;
        const content = event.target.note.value;
        const date = noteDate;
        const data = { email, title, content, date };
        dispatch(addNote(data));
        navigate('/mynotes');
    }
    return (
        <TitleBar title="Create Your Note here">
            <div className=' flex justify-center'>
                <form onSubmit={handleSubmit} className="w-full border border-orange-500 mt-10 rounded">
                    <div className="flex flex-wrap mb-6 mt-8">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <input className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="grid-first-name" type="text" name="title" placeholder="Title" required />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full px-3">
                            <textarea rows="20" className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="note" name="note" type="text" placeholder="Type here" required />
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap px-3 mb-2">
                        <button className='w-full rounded-md py-2 bg-green-500 hover:bg-green-700' type="submit">Save</button>
                    </div>
                </form>
            </div>
        </TitleBar>
    );
};

export default AddNote;