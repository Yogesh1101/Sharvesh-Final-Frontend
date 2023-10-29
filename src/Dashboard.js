import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";

function Dashboard({ title, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    
      <div className="main-container">
        <header>
          <NavBar />
        </header>
        <main>
        <div className="container flex justify-content-center mt-3 fs-1 username-text">Welcome {title}</div>
          <div className="content">{children}</div>
        </main>
      </div>
  );
}

export default Dashboard;
