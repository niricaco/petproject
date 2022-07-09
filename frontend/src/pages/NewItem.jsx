import React from "react";
import { Button, Input, TextField, Select, MenuItem } from "@mui/material";
import "../css/Items.css";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

const NewItem = () => {
  const navigate = useNavigate();
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { post } = stockApi();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemUnit, setItemUnit] = useState("");

  const addItem = async () => {
    const body = {
      companyId: companyDetails._id,
      item: {
        name: itemName,
        quantity: itemQuantity,
        unit: itemUnit,
      },
    };

    const response = await post("/dashboards/item", body);
    console.log(response);
    if (response.status === 200) {
      alert("Item added successfully");
      console.log("item added");
      setItemName("");
      setItemQuantity("");
      setItemUnit("");
      // nav("/items");
    } else {
      console.log("item not added");
    }
  };

  return (
    <>
      <div>NewItems</div>
      {companyDetails ? (
        <div>
          <TextField
            id="outlined-basic"
            label="Item name"
            variant="outlined"
            size="small"
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            required
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          <Select
            id="outlined-basic"
            label="Unit"
            variant="outlined"
            size="small"
            required
            value={itemUnit}
            onChange={(e) => setItemUnit(e.target.value)}
          >
            <MenuItem value="piece">piece</MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="l">l</MenuItem>
            <MenuItem value="m">m</MenuItem>
            <MenuItem value="m2">m2</MenuItem>
            <MenuItem value="m3">m3</MenuItem>
          </Select>
          <Button onClick={addItem} variant="contained" size="small">
            Add item
          </Button>

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
        ""
      )}
    </>
  );
};

export default NewItem;
