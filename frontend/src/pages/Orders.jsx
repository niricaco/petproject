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
      <div>Orders</div>
      <Button
        onClick={() => nav("/new-order")}
        variant="contained"
        size="small"
      >
        New order
      </Button>
      <Button onClick={() => nav("/profile")} variant="contained" size="small">
        Profile
      </Button>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <div>Your orders</div>
            <div>
              {userDetails.filter((user) => user._id === order.orderedBy)}
            </div>
            <div>{order.quantity}</div>
            <div>{order.price}</div>
          </div>
        ))
      ) : (
        <div>No orders</div>
      )}
    </>
  );
};

export default Orders;
