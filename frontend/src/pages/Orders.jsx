import React from "react";
import { Button, ListItem, TextField } from "@mui/material";
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
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [unconfirmedOrders, setUnconfirmedOrders] = useState([]);

  const confirmed = () => {
    const confirmedOrders = orders.filter((order) => {
      return order.confirmed === true;
    });
    setConfirmedOrders(confirmedOrders);
  };

  const unconfirmed = () => {
    const unconfirmedOrders = orders.filter((order) => {
      return order.confirmed === false;
    });
    setUnconfirmedOrders(unconfirmedOrders);
  };

  useEffect(() => {
    if (orders[0]) {
      confirmed();
      unconfirmed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  useEffect(() => {
    if (!companyDetails?.orders) return setOrders([]);
    setOrders(companyDetails.orders);
  }, [companyDetails]);

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(confirmedOrders);
  console.log(unconfirmedOrders);

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
        {unconfirmedOrders?.length > 0 ? (
          <>
            <h4>Unconfirmed orders</h4>

            {unconfirmedOrders.map((order) => {
              return (
                <ListItem
                  key={order.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "0px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Order ID"
                    variant="outlined"
                    value={order._id}
                    defaultValue={order._id}
                    style={{ width: "40%", marginRight: "5px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Order date"
                    variant="outlined"
                    value={order.orderDate}
                    defaultValue={order.orderDate}
                    style={{ width: "40%", marginRight: "5px" }}
                  />
                  {/* <TextField
                  id="outlined-basic"
                  label="Order quantity"
                  variant="outlined"
                  value={order.quantity}
                  style={{ width: "10%", marginRight: "5px" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Order price"
                  variant="outlined"
                  value={order.price}
                  style={{ width: "10%", marginRight: "5px" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Order total"
                  variant="outlined"
                  value={order.total}
                  style={{ width: "10%", marginRight: "5px" }}
                /> */}
                  <Button
                    onClick={() => {
                      post(`/orders/${order.id}/confirm`);
                      getCompanies();
                    }}
                    variant="contained"
                    size="small"
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  >
                    Confirm
                  </Button>
                </ListItem>
              );
            })}
          </>
        ) : (
          <p>No unconfirmed orders</p>
        )}
        {confirmedOrders.length > 0 ? (
          <>
            <h3>Confirmed orders</h3>
            {confirmedOrders.map((order, key) => (
              <ListItem
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                <TextField
                  value={order.email}
                  size="small"
                  label="Email"
                ></TextField>
              </ListItem>
            ))}
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Orders;
