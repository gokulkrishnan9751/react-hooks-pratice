import React, { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

export default function AuthGuard(WrapperComponent) {
  return function protectComponent(props) {
    const navigate = useNavigate();
    useEffect(() => {
      const isAuthendicated = sessionStorage.getItem("profile");
      if (!isAuthendicated) {
        navigate("/login", replace);
      }
    });
    return <WrapperComponent {...props} />;
  };
}