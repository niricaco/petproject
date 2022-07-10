import React from "react";
import { Button, Input } from "@mui/material";
import "../css/Orders.css";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";
import { useEffect } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { post } = stockApi();

  const nav = (path) => {
    navigate(path);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!companyDetails?.orders) return setOrders([]);
    setOrders(companyDetails.orders);
  }, [companyDetails]);

  console.log(userDetails);
  console.log(orders);

  return (
    <>
      <section className="sectionContainerOrders">
        <Button
          onClick={() => nav("/profile")}
          variant="contained"
          size="small"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          Profile
        </Button>
        <h3>Orders</h3>

        <Button
          onClick={() => nav("/new-order")}
          variant="contained"
          size="small"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          New order
        </Button>
      </section>
    </>
  );
};

export default Orders;
