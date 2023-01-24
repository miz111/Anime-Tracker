import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage.js";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./Favorites";
import FavoriteForm from "./FavoriteForm";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import { useToken, AuthProvider, useAuthContext } from "./auth";
import Nav from "./Nav";

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
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Top100/" element={<Top100 />} />
            <Route path="/:mal_id/" element={<Details />} />
            <Route path ="/Search/" element={<SearchList />} />
            <Route path="login/" element={<LoginForm />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="favorites/new" element={<FavoriteForm />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
