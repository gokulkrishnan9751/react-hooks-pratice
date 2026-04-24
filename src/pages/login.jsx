import React, { useContext, useRef, useState } from "react";
import { FavouriteContext } from "../context/favouriteProveider";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { setProfileData } = useContext(FavouriteContext);
  const [errMsg, setErrMsg] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  async function getProfileDetail() {
    const username = inputRef.current.value.trim();

    if (!username) {
      setErrMsg("Please enter a username");
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}`,
      );

      if (!response.ok) {
        throw new Error("Not found");
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        throw new Error("No users found");
      }

      setProfileData(data.items[0]);
      sessionStorage.setItem("profile", JSON.stringify(data.items[0]));
      setErrMsg("");
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
      console.log(err);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-input">
          <div>Enter the Git user name</div>
          <input type="text" ref={inputRef} onChange={() => setErrMsg("")}/>
        </div>
        <button
          onClick={() => {
            getProfileDetail();
          }}
        >
          Login
        </button>
        <label className="message">{errMsg}</label>
      </div>
    </div>
  );
}
