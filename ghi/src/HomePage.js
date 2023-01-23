import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [popularEpisodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/watch/episodes/popular")
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.data);
      })
      .catch((error) => console.log("Error", error));
  }, []);


  let test = JSON.stringify(popularEpisodes[0]);



  return (
    <div className="px-4 py-5 my-5 text-center">
      <script src="js/jquery-1.7.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <h1 className="display-5 fw-bold">Ani-Reactor</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Find your new favorite show here!</p>
      </div>

      <div>

      </div>

    </div>
  );
}

export default HomePage;
