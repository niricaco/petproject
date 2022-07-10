import { Button } from "@mui/material";
import "../css/Navbar.css";
import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";
import { useDetails } from "../providers/details";

const Navbar = () => {
  const { token, logout } = useAuth();
  const { userDetails, companyDetails } = useDetails();

  useEffect(() => {}, [companyDetails]);

  return (
    <>
      <nav>
        {userDetails ? (
          <p>
            {userDetails.username}
            {companyDetails ? ` - ${companyDetails.name}` : ""}
          </p>
        ) : (
          ""
        )}

        {token ? (
          <Button onClick={logout} variant="contained" size="small">
            Logout
          </Button>
        ) : (
          "You are not logged in"
        )}
      </nav>
    </>
  );
};

export default Navbar;
