import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useToken, AuthProvider, useAuthContext } from "./auth";
import Nav from "./Nav";
import HomePage from "./HomePage.js";
import "./App.css";
import Favorites from "./Favorites";
import FavoriteForm from "./FavoriteForm";
import Watchlist from "./Watchlist.js";
import WatchlistForm from "./WatchlistForm.js";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm.js";
import AccountEditForm from "./AccountEditForm.js";
import AccountDetailView from "./AccountDetailView.js";
import Top100 from "./Top100.js";
import Details from "./Details.js";
import SearchList from "./SearchList.js";

function GetToken() {
  useToken();
  return null;
}
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
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Top100/" element={<Top100 />} />
              <Route path="ani-reactor/:mal_id/" element={<Details />} />
              <Route path="/Search/" element={<SearchList />} />
              <Route path="login/" element={<LoginForm />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="favorites/new" element={<FavoriteForm />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="watchlist/new" element={<WatchlistForm />} />
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
