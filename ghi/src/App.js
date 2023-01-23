import React from "react";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";
import SignUpForm from "./SignUpForm.js";
import LoginForm from "./LoginForm.js";
import AccountEditForm from "./AccountEditForm.js";
import AccountDetailView from "./AccountDetailView.js";
import { AuthProvider, useToken } from "./auth";
import HomePage from "./HomePage.js";



const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function GetToken() {
  useToken();
  return null;
}

function App() {

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="signup" element={<SignUpForm />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/AccountEditForm" element={<AccountEditForm />} />
            <Route path="/AccountDetailView" element={<AccountDetailView />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


