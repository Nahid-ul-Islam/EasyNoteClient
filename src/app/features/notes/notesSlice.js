import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch notes
export const loadNotes = createAsyncThunk("notes/loadNotes", async(email) => {
    const res = await axios.get(`http://localhost:5000/my-notes?email=${email}`);
    return res.data;
});

//add notes
export const addNote = createAsyncThunk("notes/addNote", async(data) => {
    const res = await axios.post('http://localhost:5000/my-notes', data);
    console.log('res from add note', res);
})

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

        //add notes

    }
});

export default notesSlice.reducer;