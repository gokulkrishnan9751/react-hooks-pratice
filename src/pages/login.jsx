import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavouriteContext } from "../context/favouriteProveider";
import { useProfile } from "../hooks/useProfile";

export default function Login() {
  const { setProfileData } = useFavouriteContext();
  const { loading, fetchProfile } = useProfile();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  async function getProfileDetail() {
    const username = inputRef.current.value.trim();
    if (!username) {
      setErrMsg("Please enter a username");
      return;
    }

    try {
      const data = await fetchProfile(username);
      setProfileData(data);
      sessionStorage.setItem("profile", JSON.stringify(data));
      navigate("/profile");
    } catch (error) {
      setErrMsg(error?.message || "Something went wrong");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-input">
          <div>Enter the Git user name</div>

          <input
            type="text"
            ref={inputRef}
            onChange={() => setErrMsg("")}
          />
        </div>

        <button onClick={getProfileDetail} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        {errMsg && <label className="message">{errMsg}</label>}
      </div>
    </div>
  );
}