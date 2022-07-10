import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
const Home = () => {
  const { token, auth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) return navigate("/profile");
  }, [user, navigate]);

  return (
    <>
      <section className="sectionContainerHome">
        <h3>Welcome</h3>
        <p>{token ? "Logged in" : "PLease log in"}</p>

        {token ? (
          <>
            <br />
            <p>Welcome</p>
          </>
        ) : (
          <>
            <Button
              onClick={() => auth("oid")}
              variant="contained"
              color="info"
              size="small"
            >
              Login
            </Button>
            <br />
            <Button
              onClick={() => auth("google")}
              variant="contained"
              color="info"
              size="small"
            >
              Google login
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
