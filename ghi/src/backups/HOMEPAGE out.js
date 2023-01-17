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

      

      <div class="container">
        <div class="row">
          <div class="col-md-10 col-center">
            <div
              id="myCarousel"
              class="carousel slide"
              data-ride="carousel"
              data-interval="0"
            >
              {/* <!-- Carousel indicators --> */}
              <ol class="carousel-indicators">
                <li
                  data-target="#myCarousel"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>
              {/* <!-- Wrapper for carousel items --> */}
              <div class="carousel-inner">
                <div class="item active">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            className="img-responsive"
                            src="https://www.w3schools.com/bootstrap/paris.jpg"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>London</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam eu sem tempor, varius quam.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/new-york.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>New York</h4>
                          <p>
                            Vivamus fermentum in arcu in aliquam. Quisque aliqua
                            porta odio in fringilla vivamus.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/paris.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Paris</h4>
                          <p>
                            Convallis eget pretium eu, bibendum non leo. Proin
                            susc ipit purus adipiscing dolor.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/kuala-lumpur.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Kuala Lumpur</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam eu sem tempor, varius quam.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/agra.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Agra</h4>
                          <p>
                            Vivamus fermentum in arcu in aliquam. Quisque aliqua
                            porta odio in fringilla vivamus.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/dubai.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Dubai</h4>
                          <p>
                            Convallis eget pretium eu, bibendum non leo. Proin
                            susc ipit purus adipiscing dolor.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/rio-de-janeiro.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Rio De Janeiro</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam eu sem tempor, varius quam.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/giza.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Giza</h4>
                          <p>
                            Vivamus fermentum in arcu in aliquam. Quisque aliqua
                            porta odio in fringilla vivamus.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img
                            src="/examples/images/cities/sydney.png"
                            class="img-responsive"
                            alt=""
                          />
                        </div>
                        <div class="thumb-content">
                          <h4>Sydney</h4>
                          <p>
                            Convallis eget pretium eu, bibendum non leo. Proin
                            susc ipit purus adipiscing dolor.
                          </p>
                          <a href="#" class="btn btn-primary">
                            More <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Carousel controls --> */}
              <a
                class="carousel-control left"
                href="#myCarousel"
                data-slide="prev"
              >
                <i class="fa fa-angle-left"></i>
              </a>
              <a
                class="carousel-control right"
                href="#myCarousel"
                data-slide="next"
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
