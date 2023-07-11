import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profileSlice";
import courseReducer from "../slices/courseSlice"
import viewSlice from "../slices/viewSlice";


const rootReducer = combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    course:courseReducer,
    viewCourse:viewSlice
});

export default rootReducer;