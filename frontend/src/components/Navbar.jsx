import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const nav = (path) => {
    /* console.log("rerouting"); */ // barmilyen route elotti logika, pl lejart token ellenorzese
    navigate(path);
  };

  const { auth, token, logout, userDetails } = useAuth();

  return (
    <>
      <nav>
        {userDetails
          ? `Logged in as  ${userDetails.username} `
          : "Anonymus user"}
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          "You are not logged in"
        )}
      </nav>
    </>
  );
};

export default Navbar;
