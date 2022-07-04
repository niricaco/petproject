import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { token, auth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) return navigate("/profile");
  }, [user, navigate]);

  return (
    <>
      <div>Welcome</div>
      <p>{token ? "Logged in" : "PLease log in"}</p>

      {token ? (
        <>
          <br />
          <p>Welcome</p>
        </>
      ) : (
        <>
          <Button
            onClick={() => auth("google")}
            variant="contained"
            color="info"
            size="small"
          >
            Google login
          </Button>
          <Button
            onClick={() => auth("oid")}
            variant="contained"
            color="info"
            size="small"
          >
            My login
          </Button>
        </>
      )}
    </>
  );
};

export default Home;
