import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { oidApi } from "../api/oidApi";
import { useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";
import "../css/Home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const api = oidApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState(null);
  const [redirectUri, setRedirectUri] = useState(null);

  const login = async () => {
    const response = await api.post("/user/login", {
      email,
      password,
      client,
      redirectUri,
    });
    if (!response) return alert("Network error!");
    if (response.status !== 200) return alert("Error!");
    const code = response.data.code;
    window.location.href = redirectUri + "?code=" + code;
  };

  const signup = async () => {
    const response = await api.post("/user/signup", {
      email,
      password,
    });
    if (!response) return alert("Network error!");
    if (response.status !== 200) return alert("Error!");
    alert("Success!");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const _client = searchParams.get("client_id");
    const _redirectUri = searchParams.get("redirect_uri");
    if (!_client) {
      return setError("Missing params - client_id");
    }
    if (!_redirectUri) {
      return setError("Missing params - redirect_uri");
    }
    setClient(_client);
    setRedirectUri(_redirectUri);
  }, []);

  return (
    <>
      <section className="sectionContainerHome">
        <h3>Home</h3>
        {error && <div>{error}</div>}
        {!error && (
          <>
            <TextField
              placeholder="Email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{
                width: "100%",
                padding: "0px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            />
            <TextField
              placeholder="Password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{
                width: "100%",
                padding: "0px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            />
            <Button
              onClick={login}
              variant="contained"
              style={{ marginTop: "5px", marginBottom: "5px" }}
              disabled={!email || !email.includes("@") || !password}
            >
              Login
            </Button>
            <Button
              onClick={signup}
              variant="contained"
              disabled={!email || !email.includes("@") || !password}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Signup
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
