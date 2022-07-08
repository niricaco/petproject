import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";
import { useDetails } from "../providers/details";

const Navbar = () => {
  const { token, logout } = useAuth();
  const { userDetails, companyDetails } = useDetails();

  useEffect(() => {}, [companyDetails]);

  console.log(userDetails);

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          {userDetails ? (
            <div>
              Logged in as {userDetails.username}
              {companyDetails ? ` - ${companyDetails.name}` : ""}
            </div>
          ) : (
            "Anonymus user"
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
