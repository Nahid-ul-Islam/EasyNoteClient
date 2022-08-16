import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch notes
export const loadNotes = createAsyncThunk("notes/loadNotes", async (email) => {
    const res = await axios.get(`https://afternoon-oasis-49033.herokuapp.com/my-notes?email=${email}`);
    return res.data;
});

//add notes
// export const addNote = createAsyncThunk("notes/addNote", async (data) => {
//     const res = await axios.post('https://afternoon-oasis-49033.herokuapp.com/my-notes', data);
//     return res.data;
// });

//update note
// export const updateNote = createAsyncThunk("notes/updateNote", async (data) => {
//     const updateNote = {
//         email: data.email,
//         title: data.title,
//         content: data.content,
//         date: data.date
//     }
//     const res = await axios.put(`https://afternoon-oasis-49033.herokuapp.com/my-notes/${data.id}`, updateNote);
//     return res.data;
// });

//delete note
// export const delNote = createAsyncThunk("notes/delNote", async (id, email) => {
//     let res = await axios.delete(`https://afternoon-oasis-49033.herokuapp.com/my-notes/${id}`);
//     return res.data;
// });

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        isLoading: false,
        notes: [],
        error: null
    },
    extraReducers: (builder) => {
        //fetch notes
        builder.addCase(loadNotes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loadNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = action.payload;
            state.error = null;
        });
        builder.addCase(loadNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.notes = [];
            state.error = action.error.message;
        });
    }
});

export default notesSlice.reducer;