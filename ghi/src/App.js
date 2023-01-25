import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./Favorites";
import FavoriteForm from "./FavoriteForm";
import Watchlist from "./Watchlist.js";
import WatchlistForm from "./WatchlistForm.js";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import { useToken, AuthProvider, useAuthContext } from "./auth";
import Nav from "./Nav";
import SignUpForm from "./SignUpForm.js";
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

export default function App() {
  const { token } = useAuthContext();
  console.log(token);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <GetToken />
          <Nav />
          <div>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="login/" element={<LoginForm />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="favorites/new" element={<FavoriteForm />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="watchlists/new" element={<WatchlistForm />} />
              <Route path="/AccountEditForm" element={<AccountEditForm />} />
              <Route path="/AccountDetailView" element={<AccountDetailView />} />
              <Route path="signup" element={<SignUpForm />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
