import React from "react";
import { useEffect, useState } from "react";
import "./index.css";

function Top100() {
	// const [scrollHeight, setScrollHeight] = useState(0);
	const [top100, setTop100] = useState([]);
	// const [overFlowData, setOverFlowData] = useState(true);
	// const [page, setPage] = useState(1);
  const blueStar = require('./blueStar.png')

  // const handleScroll = (event) => {
  //   setScrollHeight(event.target.scrollTop);
  //   const { scrollHeight, clientHeight, scrollTop } = event.target;
  //   if (scrollHeight - clientHeight === scrollTop && overFlowData) {
  //     setPage(page + 1);
  //   }
  // };

  useEffect( () => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime");
				const data = await response.json();
				if (data.data.length === 0) {
					// setOverFlowData(false);
					return;
        }
				setTop100(data.data);
			}
			catch(error) {
				console.log(error);
      }
		};

    fetchData();
	}, []);

  return (
    <div
    // style={{ overflow: "auto", maxHeight: "500px" }}
    // onScroll={handleScroll}
    >
      <ul className="results table">
        {top100.map((item, index) => (
          <li key={index} className="card">
            <div className="row g-0">
              <div className="col-auto">
                <span className="Rank">#{item.rank}</span>
              </div>
              <div className="col-1">
                <div className="card-img">
                  <a
                    href={`ani-reactor/${item.mal_id}`}
                  >
                    <img
                      src={item.images.jpg.large_image_url}
                      alt={item.title}
                      height="125px"
                    />
                  </a>
                </div>
              </div>
              <div className="col-auto"></div>
              <div className="col-5">
                <div className="card-body">
                  <a href={`/ani-reactor/${item.mal_id}`}>
                    <div className="card-title">
                      {item.title_english}
                      <div className="card-subtitle mb-2 text-muted">
                        {item.title_japanese}
                      </div>
                    </div>
                  </a>
                  <div className="badge bg-danger">{item.genres[0].name}</div>
                </div>
              </div>
              <div className="col-auto">
                <div className="badge bg-warning rounded-pill">
                  <img
                    src={blueStar}
                    alt="score"
                    height="20px"
                    align="center"
                  />
                  <> </>
                  {item.score}
                </div>
              </div>
              <div className="col-2">
                <div className="item-showtype" align="center">
                  Show Type: {item.type}
                  <div className="item-episodes">{item.episodes} Episodes</div>
                </div>
              </div>
              <div className="col-1">
                <div className="item-status" align="center">
                  {item.status}
                  <div className="item-lastStatus" align="center">
                    {item.aired.string.slice(15)}
                  </div>
                </div>
              </div>
              <div className="col-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top100;