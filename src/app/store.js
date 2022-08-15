import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./features/notes/notesSlice";

const store = configureStore({
    reducer : {
        notesReducer : notesSlice
    }
});

export default store;