import React, { useEffect } from "react";
import Card from "../component/card";
import Nav from "../component/nav";
import { useFavourites } from "../hooks/useProfile";
import { useFavouriteContext } from "../context/favouriteProveider";
import AuthGuard from "../context/authGuard";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("profile"));

  const { favourite, setFavourite } = useFavouriteContext();
  const { favouriteList, loading, fetchFavourites } = useFavourites();

  useEffect(() => {
    const fav = JSON.parse(sessionStorage.getItem("favourite") || "[]");
    if (fav) {
      setFavourite(fav);
    }
  }, [setFavourite]);

  useEffect(() => {
    fetchFavourites(favourite);
  }, [favourite]);

  return (
    <div className="profile-page">
      <Nav />

      <div className="profile-card">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="profile-avatar"
        />

        <h2 className="profile-name">{user.login}</h2>
        <p className="profile-id">ID: {user.id}</p>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="profile-link"
        >
          View GitHub Profile
        </a>
      </div>

      {loading && <p>Loading favourites...</p>}

      {favouriteList?.length > 0 && (
        <div className="fav-section">
          <h3 className="fav-title">Favourites</h3>

          <div className="fav-grid">
            {favouriteList.map((fav) => (
              <Card key={fav.id} data={fav} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;