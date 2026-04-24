import React, { useState, useRef, useEffect } from "react";
import Nav from "../component/nav";
import Card from "../component/card";
import AuthGuard from "../context/authGuard";

function Home() {
  const [searchData, setSearchData] = useState([]);
  const searchBar = useRef();
  const [errMsg, setErrMsg] = useState()

  useEffect(() => {
    searchBar.current.focus();
  }, []);

  async function handleSearch() {
    const search = searchBar.current.value.trim();
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${search}`,
      );
      const data = await res.json();
      setSearchData(data.items);
    } catch (error) {
      
      console.log(error);
    }
  }
  return (
<div className="page">
      <Nav />

      <div className="search-container">
        <input
          type="text"
          ref={searchBar}
          className="search-input"
          placeholder="Search GitHub users..."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="results">
        {searchData.map((profile) => (
          <Card key={profile.id} data={profile} />
        ))}
      </div>
    </div>

  );
}

export default AuthGuard(Home);
