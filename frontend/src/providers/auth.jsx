import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import http from "axios";
import jwt_decode from "jwt-decode";
import { toDoApi } from "../api/toDoApi";
import config from "../app.config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(0);
  const [user, setUser] = useState(null);
  const { post } = toDoApi();

  const auth = () => {
    const googleBaseUrl = config.google_base_url;

    const searchParams = new URLSearchParams();
    searchParams.append("client_id", config.google_client_id);
    searchParams.append("scope", "openid");
    searchParams.append("redirect_uri", window.location.origin + "/callback");
    searchParams.append("response_type", "code");
    searchParams.append("prompt", "select_account");

    const fullUrl = googleBaseUrl + "?" + searchParams.toString();

    window.open(fullUrl, "_self");
  };

  const login = async (code, provider) => {
    try {
      const response = await post("/user/login", {
        code: code,
        provider: provider,
      });
      setToken(response.data.sessionToken);
      localStorage.setItem("sessionToken", response.data.sessionToken);
      setUser(jwt_decode(response.data.sessionToken));
    } catch (error) {
      console.log(error);
      setToken(null);
      localStorage.removeItem("sessionToken");
    }
  };

  const register = async (username) => {
    const response = await post("/user/create", { username });
    if (response?.status === 200) {
      setToken(response.data.sessionToken);
      localStorage.setItem("sessionToken", response.data.sessionToken);
      setUser(jwt_decode(response.data.sessionToken));
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("sessionToken");
  };

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("sessionToken");
    if (tokenInStorage) {
      setToken(tokenInStorage);
      setUser(jwt_decode(tokenInStorage));
    }
  }, []);

  const contextValue = { token, user, auth, login, logout, register };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Add authProvider to root.");
  return context;
};

export { AuthProvider, useAuth };
