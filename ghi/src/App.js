import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import HomePage from "./HomePage.js";
import SignUpForm from "./SignUpForm.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./Nav";
// import SignUpForm from "./SignUpForm";
// import LoginForm from "./LoginForm";
import { AuthProvider, useToken } from "./auth";



function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={launch_info} />
    </div>
  );
}

export default App;
