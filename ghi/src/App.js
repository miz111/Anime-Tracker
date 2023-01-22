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
import EditPassword from "./EditPassword.jsx";


const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function GetToken() {
  useToken();
  return null;
}

function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_ACCOUNTS}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);

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
            <Route path="/editpassword" element={<EditPassword />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


