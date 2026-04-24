import { useState } from "react";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseState from "./pages/useState";
import Home from "./pages/home";
import FavouriteProveider from "./context/favouriteProveider";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <FavouriteProveider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </FavouriteProveider>
  );
}

export default App;
