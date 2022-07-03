import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const nav = (path) => {
    /* console.log("rerouting"); */ // barmilyen route elotti logika, pl lejart token ellenorzese
    navigate(path);
  };

  const { auth, token, logout } = useAuth();

  /* const token = localStorage.getItem("sessionToken"); */

  return (
    <>
      <nav
        className="navbar"
        style={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button onClick={() => nav("/")}>Home</button>
          <button onClick={() => nav("/about")}>About</button>
          <button onClick={() => nav("/profile")}>Profile</button>
        </div>
        {/* <button onClick={() => navigate("/profile")}>Profile</button> */}
        <div>
          {token ? (
            <button onClick={logout}>logout</button>
          ) : (
            <button onClick={auth}>Login</button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
