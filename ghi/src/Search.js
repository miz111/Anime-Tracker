import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

export function Search(query) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      const result = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&sfw`
      );
      const data = await result.json();
      if (data.length === 0) {
        setIsData(false);
      }
      setSearchResults(data.data);
      setIsLoading(false);
      setIsData(true);
    };
    if (query) {
      fetchResult();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return { searchResults, isLoading, isData};
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { searchResults, isLoading, isData } = Search(query);

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Searching for:", query);
  }

  if (isData === false) {
    return (
      <div>
        <span>No results</span>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for an Anime..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {searchResults.map((data, index) => (
            <li key={index}>{data.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
