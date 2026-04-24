import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "../component/card";
import { FavouriteContext } from "../context/favouriteProveider";
import Nav from "../component/nav";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const { favourite, setFavourite } = useContext(FavouriteContext);
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(sessionStorage.getItem("favourite") || "[]");

    if (fav) {
      setFavourite(fav);
    }
  }, []);

  const fetchFav = useCallback(async () => {
    try {
      const responses = await Promise.all(
        favourite.map((id) =>
          fetch(`https://api.github.com/search/users?q=${id}`).then((res) =>
            res.json(),
          ),
        ),
      );

      const firstUsers = responses.map((res) => res.items[0]);

      setFavouriteList(firstUsers);
    } catch (err) {
      console.log(err);
    }
  }, [favourite]);

  useEffect(() => {
    fetchFav();
  }, [fetchFav]);

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

      {favouriteList.length > 0 && (
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
