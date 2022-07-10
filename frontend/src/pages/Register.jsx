import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../css/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { register, user } = useAuth();

  useEffect(() => {
    if (user.userId) return navigate("/profile");
  }, [user, navigate]);

  /* useEffect(() => {
    if (user.providers.oid.email) setEmail(user.providers.oid.email);
  }, [user, setEmail]) */

  return (
    <>
      <section className="sectionContainerRegister">
        <h3>Register</h3>
        <form>
          <TextField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
          <TextField
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            style={{
              width: "100%",
              padding: "0px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
          <TextField
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={{
              width: "100%",
              padding: "0px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
          <TextField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
        </form>
        <Button
          variant="contained"
          onClick={() => register(email, firstname, lastname, username)}
        >
          Register
        </Button>
      </section>
    </>
  );
};

export default Register;
