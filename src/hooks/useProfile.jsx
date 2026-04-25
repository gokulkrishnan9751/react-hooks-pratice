import { useState } from "react";
import useToastAction from "./useToastAction";
import { fetchProfile, searchUsers } from "../api/fetchUserApi";

export const useProfile = () => {
  const { error } = useToastAction();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async (username) => {
    setLoading(true);

    try {
      const data = await fetchProfile(username);
      setProfile(data);
      return data;
    } catch (err) {
      console.error(err);
      error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, fetchProfile: fetchProfileData };
};

export const useFavourites = () => {
  const { error } = useToastAction();
  const [favouriteList, setFavouriteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavourites = async (favourites = []) => {
    if (!Array.isArray(favourites) || favourites.length === 0) {
      setFavouriteList([]);
      return [];
    }

    setLoading(true);
    try {
      const responses = await Promise.all(
        favourites.map((username) => searchUsers(username)),
      );

      const users = responses
        .map((items) => items?.[0])
        .filter(Boolean);

      setFavouriteList(users);
      return users;
    } catch (err) {
      console.error(err);
      error(err?.message || "Failed to fetch favourites");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { favouriteList, loading, fetchFavourites };
};

export default useProfile;
