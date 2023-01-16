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

  console.log(popularEpisodes[0]);

  let test = JSON.stringify(popularEpisodes[0]);

  


  return (
    <div className="px-4 py-5 my-5 text-center">
      <script src="js/jquery-1.7.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <h1 className="display-5 fw-bold">Ani-Reactor</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Find your new favorite show here!</p>
      </div>

      <div className="container">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className="container px-4 py-6">
                <div className="row featurette">
                  <div className="col-md-5 order-md-2">
                    <h2 class="featurette-heading fw-bold lh-1">
                      Anime Title in English{" "}
                      <h2 class="text-muted">Anime Title in Japanese</h2>
                    </h2>
                    <p class="lead" align="left">
                      Another featurette? Of course. More placeholder content
                      here to give you an idea of how this layout would work
                      with some actual real-world content in place.
                    </p>
                  </div>
                  <div className="col-md-5 p-1 order-md-1">
                    <img
                      src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145139-Z4DjPTGNyuDj.jpg"
                      className="img-responsive"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://via.placeholder.com/150"
                className="img-responsive"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://via.placeholder.com/150"
                className="img-responsive"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
