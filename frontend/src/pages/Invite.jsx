import { Button, TextField } from "@mui/material";
import React from "react";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";
import "../css/Invite.css";

const Invite = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const { companyDetails } = useDetails();

  const { post } = stockApi();

  const inviteUser = async () => {
    const response = await post("/company/invite", {
      email: email,
      companyId: companyDetails._id,
    });
    if (response.status !== 200) return alert("Error inviting user");
    setEmail("");
    alert("Invitation sent");
  };

  return (
    <>
      <section className="sectionContainerInvite">
        <Button onClick={() => nav("/users")} variant="contained" size="small">
          Users
        </Button>
        <h3>Invite a user</h3>
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
      </section>
    </>
  );
};

export default Invite;
