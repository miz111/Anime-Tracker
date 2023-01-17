import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Top100() {
	const [scrollHeight, setScrollHeight] = useState(0);
	const [top100, setTop100] = useState([]);
	const [overFlowData, setOverFlowData] = useState(true);
	const [page, setPage] = useState(1);
	const items = [
    {
      src: "https://cdn.myanimelist.net/r/50x70/images/anime/1764/126627.webp?s=08520f4c12e14b0af58ed2ea9fbd328b",
    },
  ];

  const handleScroll = (event) => {
    setScrollHeight(event.target.scrollTop);
    const { scrollHeight, clientHeight, scrollTop } = event.target;
    if (scrollHeight - clientHeight === scrollTop && overFlowData) {
      setPage(page + 1);
    }
  };

  useEffect( () => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime");
				const data = await response.json();
				if (data.data.length === 0) {
					setOverFlowData(false);
					return;
        }
				setTop100(data.data);
			}
			catch(error) {
				console.log(error);
      }
		};

    fetchData();
	}, [page]);

	console.log(top100)

  return (
    <div
      style={{ overflow: "auto", maxHeight: "200px" }}
      onScroll={handleScroll}
    >
      <ul className="results table">
        {top100.map((item, index) => (
          <li key={index} className="results-item">
            <div className="item-name">{item.mal_id}</div>
            <div className="item-price">{item.title}</div>
            <div className="item-quantity">{item.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top100;