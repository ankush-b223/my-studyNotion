import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { Toaster } from "react-hot-toast";



const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>

    <BrowserRouter>
	    <App />
      <Toaster 
      position="bottom-center"
      containerClassName=""
      toastOptions={{

        className: 'bg-richblack-5 font-semibold rounded-md',
        duration: 4000,
    
        success: {
          duration: 3000,
          className:'border-b-[5px] border-caribbeangreen-400 font-semibold'
        },

        error: {
          duration: 5000,
          className:'border-b-[5px] border-pink-50 font-semibold'
        },

        loading: {
          duration: 3500,
          className:'border-b-[5px] border-richblack-700 font-semibold'
        },
      }}/>
    </BrowserRouter>

  </Provider>
  
    

);
