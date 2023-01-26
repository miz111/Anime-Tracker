import { useState, useEffect } from "react";
import { useAuthContext } from "./auth";


export default function WatchlistForm() {
  const [decodedUser, setDecodedUser] = useState("");
  const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const variable = JSON.parse(jsonPayload);
    setDecodedUser(variable.account.id);
  }

  useEffect(() => {
    if (token !== null) {
      parseJwt(token);
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWatchlist = {
      user_id: decodedUser,
      title,
      date,
      img_url:imgUrl,
    };


    const watchlistUrl = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newWatchlist),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(watchlistUrl, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setTitle("");
      setDate("");
      setImgUrl("");
    }
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Anime into your watch list</h1>
          <form onSubmit={handleSubmit} id="create-bin-form">
            <div className="form-floating mb-3">
              <label htmlFor="title">Anime Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="title"
                name="title"
                id="title"
                className="form-control form-input"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="date">Air Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                type="date"
                name="date"
                id="date"
                className="form-control form-input"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="url">Img</label>
              <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
                type="url"
                name="img_url"
                id="img_url"
                className="form-control form-input"
              />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
