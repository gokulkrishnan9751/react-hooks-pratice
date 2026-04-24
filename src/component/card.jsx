import React, { useContext } from "react";
import { FavouriteContext } from "../context/favouriteProveider";

export default function Card({ data }) {
  const { handleFavourite, favourite } = useContext(FavouriteContext);
  return (
    <div className="github-card">
      <div className="github-left">
        <img src={data.avatar_url} alt={data.login} className="github-avatar" />

        <div className="github-content">
          <a href={data.html_url} target="_blank" className="github-title">
            {data.login}
          </a>

          <div className="github-desc">GitHub User Profile</div>

          <div className="github-meta">ID: {data.id}</div>
        </div>
      </div>

      <button className={favourite.includes(data.login) ? "github-btn-active" : "github-btn"} onClick={() => handleFavourite(data.login)}>
        Favorite
      </button>
    </div>
  );
}
