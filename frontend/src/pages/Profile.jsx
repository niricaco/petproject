import React from "react";
import { Button, Input } from "@mui/material";
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
    console.log("rerouting");
    navigate(path);
  };

  const [companyName, setCompanyName] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");

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
      userId: userDetails._id,
      email: userDetails.email,
    });
    if (response.status === 200) {
      getCompanies();
    }
  };

  return (
    <>
      <section className="sectionContainer">
        <div>
          {companyDetails ? (
            <div>
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
              <div>
                <Button
                  onClick={() => nav("/orders")}
                  variant="contained"
                  size="small"
                >
                  Orders
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => nav("/items")}
                  variant="contained"
                  size="small"
                >
                  Items
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* <Input
                type="text"
                placeholder="Registration code"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
              /> */}
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
