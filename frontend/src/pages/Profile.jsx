import { Button, Input } from "@mui/material";
import "../css/Profile.css";
import React from "react";
import { useAuth } from "../providers/auth";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { get, post } = stockApi(token);

  const [companyName, setCompanyName] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const createCompany = async () => {
    const response = await post("/company/create", {
      name: companyName,
      role: "owner",
      userId: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
    });
    getCompanies();
    // setCompanyDetails(response.data);
  };

  const joinCompany = async () => {
    const response = await post("/company/join", {
      confirmationCode: registrationCode,
      companyId: companyDetails._id,
      userId: userDetails._id,
      email: userDetails.email,
    });
  };

  return (
    <>
      <section>
        <div>
          {companyDetails ? (
            <div>
              {" "}
              <Button
                onClick={() => nav("/users")}
                variant="contained"
                size="small"
              >
                Users
              </Button>
            </div>
          ) : (
            <div>
              <Input
                type="text"
                placeholder="Registration code"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
              />
              <Button onClick={joinCompany}>Join to a companyDetails</Button>
              <Input
                type="text"
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Button onClick={createCompany}>Create a companyDetails</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
