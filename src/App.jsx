import { useState } from "react";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FavouriteProveider from "./context/favouriteProveider";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ToastProvider from "./context/toastProvider";
import AuthGuard from "./context/authGuard";
const ProtectedProfile = AuthGuard(Profile);

function App() {
  return (
    <ToastProvider>
      <FavouriteProveider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<ProtectedProfile />}></Route>
          </Routes>
        </BrowserRouter>
      </FavouriteProveider>
    </ToastProvider>
  );
}

export default App;
