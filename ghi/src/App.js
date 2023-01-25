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
import Top100 from "./Top100";
import Details from "./Details";
import SearchList from "./SearchList";


function GetToken() {
  useToken();
  return null;
}

export default function App() {
  const { token } = useAuthContext();
  console.log(token);
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Top100/" element={<Top100 />} />
              <Route path="/:mal_id/" element={<Details />} />
              <Route path ="/Search/" element={<SearchList />} />
              <Route path="login/" element={<LoginForm />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="favorites/new" element={<FavoriteForm />} />
              <Route path="watchlist" element={<Watchlist />}/>
              <Route path="watchlist/new" element={<WatchlistForm />}/>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
