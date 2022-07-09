import { Button, TextField } from "@mui/material";
import React from "react";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

const Invite = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const { userDetails, companyDetails } = useDetails();

  const { post } = stockApi();

  const inviteUser = async () => {
    const response = await post("/company/invite", {
      email: email,
      companyId: companyDetails._id,
    });
    console.log(response.data);
  };

  return (
    <>
      <div>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          label="Email"
        ></TextField>
        <Button
          variant="contained"
          size="small"
          onClick={inviteUser}
          disabled={!email}
        >
          Invite
        </Button>
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
