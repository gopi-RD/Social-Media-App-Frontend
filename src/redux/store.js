import { configureStore } from "@reduxjs/toolkit";
import createPostSlice from "./createPostSlice"


const store = configureStore({
   reducer:{
    postState : createPostSlice.reducer,
   },
});

export default store;