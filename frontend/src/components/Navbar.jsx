import { Button } from "@mui/material";
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
        <div className="nav-wrapper">
          {userDetails ? (
            <div>
              {userDetails.username}
              {companyDetails ? ` - ${companyDetails.name}` : ""}
            </div>
          ) : (
            ""
          )}

          {token ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            "You are not logged in"
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
