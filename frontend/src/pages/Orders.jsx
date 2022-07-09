import React from "react";
import { Button, Input } from "@mui/material";
import "../css/Orders.css";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

const Orders = () => {
  const navigate = useNavigate();
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { post } = stockApi();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  return <div>Orders</div>;
};

export default Orders;
