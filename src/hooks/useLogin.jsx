import { useState } from "react";
import { searchUsers } from "../api/fetchUserApi";
import useToastAction from "./useToastAction";

export function   useUser() {
  const { error } = useToastAction();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const search = async (username) => {
    setLoading(true);
    setErrMsg("");

    try {
      const data = await searchUsers(username);
      setUsers(data);
      return data;
    } catch (err) {
      const message = err?.message || "Something went wrong";
      setErrMsg(message);
      error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, errMsg, search, fetchUser: search };
}

export default useUser;
