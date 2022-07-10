import React from "react";
import { Button, TextField } from "@mui/material";
import "../css/Profile.css";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

const Profile = () => {
  const navigate = useNavigate();
  const { userDetails, companyDetails, getCompanies, role } = useDetails();
  const { post } = stockApi();

  const nav = (path) => {
    navigate(path);
  };

  const [companyName, setCompanyName] = useState("");

  const createCompany = async () => {
    const response = await post("/company/create", {
      name: companyName,
      role: "owner",
      userId: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
    });
    if (response.status !== 200) return alert("Error creating company");
    getCompanies();
  };

  const joinCompany = async () => {
    const response = await post("/company/join", {
      userId: userDetails._id,
      email: userDetails.email,
    });
    if (response.status === 200) {
      getCompanies();
    }
  };

  return (
    <>
      <section className="sectionContainerProfile">
        {companyDetails ? (
          <>
            {role === "owner" ? (
              <Button
                onClick={() => nav("/users")}
                variant="contained"
                size="small"
              >
                Users
              </Button>
            ) : (
              ""
            )}
            <Button
              onClick={() => nav("/orders")}
              variant="contained"
              size="small"
            >
              Orders
            </Button>
            <Button
              onClick={() => nav("/items")}
              variant="contained"
              size="small"
            >
              Items
            </Button>
          </>
        ) : (
          <>
            <TextField
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <Button
              onClick={createCompany}
              variant="contained"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Create a company
            </Button>
            <Button
              onClick={joinCompany}
              variant="contained"
              style={{ marginTop: "15vh", marginBottom: "5px" }}
            >
              Join to a company
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Profile;
