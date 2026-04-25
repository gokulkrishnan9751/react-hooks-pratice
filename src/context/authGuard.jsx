import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGuard(WrapperComponent) {
  return function protectComponent(props) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const profile = sessionStorage.getItem("profile");
      if (!profile) {
        navigate("/login", { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    }, [navigate]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return <WrapperComponent {...props} />;
  };
}