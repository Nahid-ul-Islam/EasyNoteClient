import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./features/notes/notesSlice";
import searchSlice from "./features/searchControl/searchSlice";

const store = configureStore({
    reducer : {
        notesReducer : notesSlice,
        searchReducer : searchSlice,
    }
});

export default store;