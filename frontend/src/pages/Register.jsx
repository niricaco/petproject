import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

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
      <section>
        <div>Register</div>
        <form>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
