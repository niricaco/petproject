import { Button, Input } from "@mui/material";
import React from "react";
import { useAuth } from "../providers/auth";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Invite = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const { token, userDetails, company, user, getCompanyByUserId } = useAuth();
  const { get, post } = stockApi(token);

  const inviteUser = async () => {
    const response = await post("/company/invite", {
      email: email,
      companyId: company._id,
    });
    console.log(response.data);
  };

  return (
    <>
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={inviteUser}>Invite</Button>
        <Button
          onClick={() => nav("/profile")}
          variant="contained"
          size="small"
        >
          Profile
        </Button>
      </div>
    </>
  );
};

export default Invite;
