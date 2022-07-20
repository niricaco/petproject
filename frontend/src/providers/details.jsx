import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { stockApi } from "../apis/stockApi";
import config from "../app.config";
import { useAuth } from "./auth";
const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const { user } = useAuth();
  const { get, post } = stockApi();

  const [userDetails, setUserDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [role, setRole] = useState("");

  const invitedUser = async () => {
    const response = await post("/company/invite", {
      companyId: companyDetails._id,
      userId: userDetails._id,
      email: userDetails.email,
    });
    setCompanyDetails(response.data);
  };

  const roleOfUser = () => {
    if (userDetails?.email && companyDetails?.roles) {
      const role = companyDetails.roles.find(
        (role) => role.email === userDetails.email
      );
      return setRole(role.role);
    } else {
      if (userDetails?.email && companyDetails?.invite) {
        return invitedUser();
      }
    }
    return setRole("");
  };

  const getCompanies = async () => {
    const response = await post("/company/byuseremail", {
      email: userDetails.email,
    });
    if (!response.data) return setCompanyDetails(null);
    if (response.data.length > 1)
      return console.log("you got more companies, handle this");
    setCompanyDetails(response.data);
  };

  useEffect(() => {
    if (!user?.user) return setUserDetails(null);
    return setUserDetails(user.user);
  }, [user]);

  useEffect(() => {
    if (!userDetails?._id) return setCompanyDetails(null);
    getCompanies(userDetails._id);
  }, [userDetails]);

  useEffect(() => {
    if (companyDetails?.roles) roleOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, companyDetails]);

  const contextValue = {
    userDetails,
    setUserDetails,
    companyDetails,
    setCompanyDetails,
    getCompanies,
    role,
  };

  return (
    <>
      <DetailsContext.Provider value={contextValue}>
        {children}
      </DetailsContext.Provider>
    </>
  );
};

const useDetails = () => {
  const context = useContext(DetailsContext);
  if (!context) throw new Error("Add detailsProvider to root.");
  return context;
};

export { DetailsProvider, useDetails };
