import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";


// Creating he store
const store = configureStore({
  // Passing the reducers
  reducer:rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    {/* Provider need store that's we created above which is configure store */}
    <Provider store={store}>

      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>


    </Provider>



  </React.StrictMode>
);
