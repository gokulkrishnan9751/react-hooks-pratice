import React, { useState, useRef, useEffect } from "react";
import Nav from "../component/nav";
import Card from "../component/card";
import AuthGuard from "../context/authGuard";
import { useUser } from "../hooks/useLogin";

function Home() {
  const [searchData, setSearchData] = useState([]);
  const { loading, fetchUser } = useUser();
  const searchBar = useRef();

  useEffect(() => {
    searchBar.current.focus();
  }, []);

  async function handleSearch() {
    const search = searchBar.current.value.trim();
    const data = await fetchUser(search);
    setSearchData(data);
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

        <button className="search-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
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
