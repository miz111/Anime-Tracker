import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";

function Details () {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [mal_id, setMal_Id] = useState(null);
  const {mal_id} = useParams();
  const blueStar = require('./blueStar.png')


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${mal_id}/full`
        );
        const data = await response.json();
        setDetails(data.data);
      } catch (error) {
        setError(error);
        console.log("Error fetching details: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [`https://api.jikan.moe/v4/anime/${mal_id}/full`]);

  if (isLoading) {
    return (
      <div>
        <div class="spinner-border" role="status"></div>
        <div>
          <h1>Loading . . . 🍆</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return ( <h1>An error has occured. Error: {error.message}</h1>)
  }

  const detailStatus = details.status

  function CheckStatus() {
    if (detailStatus === "Finished Airing") {
      return (
        <div className="badge bg-success rounded-pill">
          <h6>Finished Airing</h6>
        </div>
      );
    } else {
      return (
        <div className="badge bg-danger rounded-pill">
          <h6>Currently Airing</h6>
        </div>
      );
    }
  }

  const streamingServices = details.streaming[0].url;
  
  return (
    <div className="container-fluild">
      <div className="card">
        <div className="row">
          <div className="col-auto order-1">
            <img
              className="img"
              src={details.images.jpg.large_image_url}
              alt={details.title}
              width="350"
            />
          </div>
          <div className="col order-2">
            <div className="row">
              <div className="col-sm left-detail">
                <div className="card title">
                  <h2>{details.title}</h2>
                  <div className="card-subtitle text-muted">
                    {details.title_japanese}
                  </div>
                </div>
                <div className="status">
                  <h3 className="text-decoration-underline">Status</h3>
                  <CheckStatus />
                </div>
                <p></p>
                <div>
                  <a
                    className="btn badge-crunchyroll rounded-pill external"
                    href={streamingServices}
                    role="button"
                  >
                    <h6>Stream on Crunchyroll!</h6>
                  </a>
                </div>
              </div>
              <div className="col-sm">
                <div className="badge bg-warning rounded-pill">
                  <img src={blueStar} alt="score" height="50px" align="left" />
                  <div className="badge">
                    <h2>{details.score}</h2>
                  </div>
                </div>
                <h3 className="Rank">Trending #{details.rank}</h3>
                <div>
                  <div>
                    <h4 className="Aired">Dates Aired</h4>
                    <h6 className="text-muted">{details.aired.string}</h6>
                  </div>
                  <div>
                    <h4 className="Broadcast-Time">Broadcast Time</h4>
                    <h6 className="text-muted">{details.broadcast.string}</h6>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <p>{details.synopsis}</p>
            <div className="row">
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
