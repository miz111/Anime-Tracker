import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./LoginForm.js";
import Watchlist from "./Watchlist.js";
import WatchlistForm from "./WatchlistForm.js";
import { useToken, AuthContext, AuthProvider, useAuthContext } from "./auth";
import HomePage from "./HomePage.js";

function GetToken() {
  useToken();
  return null;
}


function App() {
  const { token } = useAuthContext();
  console.log(token);

  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    // <div>
    //   <ErrorNotification error={error} />
    //   <Construct info={launch_info} />
    // </div>
    <>
    <BrowserRouter>
    <AuthProvider>
    <GetToken />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="login" element={<LoginForm />}/>
    <Route path="watchlist" element={<Watchlist />}/>
    <Route path="watchlists/new" element={<WatchlistForm />}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
