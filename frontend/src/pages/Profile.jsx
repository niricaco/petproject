import { Button, Input } from "@mui/material";
import React from "react";
import { useAuth } from "../providers/auth";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";

const Profile = () => {
  const { token, userDetails, company, user } = useAuth();
  const { get, post } = stockApi(token);

  const [companyName, setCompanyName] = useState("");

  const createCompany = async () => {
    const response = await post("/company/create", {
      name: companyName,
      userId: userDetails._id,
    });
  };

  return (
    <>
      <div>
        {company ? (
          ""
        ) : (
          <div>
            <Input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Button onClick={createCompany}>Create a company</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
