import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Details () {
  const [details, setDetails] = useState([]);
  // const [mal_id, setMal_Id] = useState(null);

  const mal_id = "43608"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/anime/",{mal_id},"/full");
        const data = await response.json();
        if (data.data.length === 0) {
          return;
        }
        setDetails(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, ["https://api.jikan.moe/v4/anime/{mal_id}/full"]);

  console.log(details)
}

export default Details;
