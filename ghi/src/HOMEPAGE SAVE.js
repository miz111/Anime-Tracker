import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [popularEpisodes, setEpisodes] = useState([]);

  useEffect(() => { 
    fetch("https://api.jikan.moe/v4/watch/episodes/popular")
      .then((response) => response.json())
      .then((data) => {setEpisodes (data.data);
      })  
      .catch((error) => console.log("Error", error));
  }, []);

  console.log(popularEpisodes[0])

  let test = JSON.stringify(popularEpisodes[0])


  return (
    <div className="px-4 py-5 my-5 text-center">
      <script src="js/jquery-1.7.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <h1 className="display-5 fw-bold">Ani-Reactor</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Find your new favorite show here!</p>
      </div>

      <div className="container">
        <div className="row spacing2">
          <h3 id="carousel heading">Ayyy lmao</h3>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div>
          <div className="row featurette">
            <div class="col-md-7 order-md-2">
              <h2 class="featurette-heading fw-bold lh-1">
                Anime Title in English{" "}
                <h2 class="text-muted">Anime Title in Japanese</h2>
              </h2>
              <p class="lead" align="left">
                Another featurette? Of course. More placeholder content here to
                give you an idea of how this layout would work with some actual
                real-world content in place.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
                alt="test"
                width="300"
                height="300"
              ></img>
            </div>
          </div>
        </div>
        <h2 className="pb-2 border-bottom">GANG</h2>
        <div>
          <div
            className=" row row-cols-1 row-cols-md-2 
          align-items-md-center g-5 py-5"
          >
            <div className="">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
                alt="test"
                width="300"
              ></img>
            </div>
            <div className="col d-flex flex-column align-items-start gap-2">
              <h3 className="fw-bold">
                Left-aligned title explaining these awesome features
              </h3>
              <p className="text-muted">
                {test}
                Paragraph of text beneath the heading to explain the heading. We
                will be importing the synopsis from the json data by collecting
                information by the mal_id
              </p>
              <div className="row">
                <a
                  href="#"
                  className="btn btn-primary btn-lg justify-content-sm-center"
                >
                  Primary button
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      



      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https:\/\/cdn.myanimelist.net\/images\/anime\/4\/19644l.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https:\/\/cdn.myanimelist.net\/images\/anime\/13\/17405l.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https:\/\/cdn.myanimelist.net\/images\/anime\/6\/73245l.jpg"
              alt="Third slide"
            />
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
            onClick="$('#myCarousel').carousel('prev')"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
            onClick="$('#myCarousel').carousel('next')"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>