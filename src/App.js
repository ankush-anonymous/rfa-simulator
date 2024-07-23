import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
// import axios from "axios";

import localforage from "localforage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Canvas from "./Pages/CanvasPage";

localforage.config({
  name: "Three-Lions",
  version: 1.0,
  storeName: "token_values",
  description: "JWT Tokens required to interact with the server.",
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
