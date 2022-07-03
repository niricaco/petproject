import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Register = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { register, user } = useAuth();

  useEffect(() => {
    if (user.userId) return navigate("/profile");
  }, [user, navigate]);

  return (
    <>
      <div>Register</div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => register(username)}>Register</button>
    </>
  );
};

export default Register;
