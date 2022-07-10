import React from "react";
import {
  Button,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";
import { useEffect } from "react";
const NewOrder = () => {
  const navigate = useNavigate();
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { post } = stockApi();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [editedItemQuantity, setEditedItemQuantity] = useState(null);
  const [editedItemUnit, setEditedItemUnit] = useState("");
  const [orderList, setOrderList] = useState([]);

  const filterItems = () => {
    const filteredItems = companyDetails.items.map((item) => {
      return item.name;
      // return item.name.toLowerCase().includes(itemName.toLowerCase());
    });
    setItemList(filteredItems);
  };

  const getItemDetails = () => {
    const item = companyDetails.items.filter((item) => {
      return item.name === selectedItem;
    });
    if (item.length === 0) return setSelectedItemDetails(null);
    setSelectedItemDetails(item[0]);
    setEditedItemUnit(item[0].unit);
  };

  const addToOrderList = () => {
    const item = {
      itemId: selectedItemDetails._id,
      name: selectedItemDetails.name,
      quantity: editedItemQuantity,
      unit: editedItemUnit,
    };
    console.log(orderList);
    setOrderList([...orderList, item]);
    setSelectedItemDetails(null);
    setEditedItemQuantity(null);
    setEditedItemUnit("");
  };

  const deleteItem = (item) => {
    setOrderList((orderList) => orderList.filter((elem) => elem !== item));
  };

  const placeOrder = async () => {
    const body = {
      companyId: companyDetails._id,
      order: {
        orderedBy: userDetails._id,
        orderList,
      },
    };
    const response = await post("/orders", body);
    if (response.status !== 200) {
      console.log("error");
    }
    setOrderList([]);
    alert("Order Placed Successfully");
    nav("/");
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyDetails.items]);

  useEffect(() => {
    getItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  console.log(orderList);

  return (
    <>
      <div>NewOrder</div>
      <Button onClick={() => nav("/orders")} variant="contained" size="small">
        Orders
      </Button>
      {orderList && orderList?.length > 0 ? (
        <div>
          <List
          // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {orderList.map((item, key) => (
              <ListItem key={key}>
                <ListItemText primary={item.name} />
                <ListItemText primary={`Qty: ${item.quantity}`} />
                <ListItemText primary={`Unit: ${item.unit}`} />
                <Button
                  onClick={() => deleteItem(item)}
                  variant="contained"
                  size="small"
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
          <Button onClick={placeOrder} variant="contained" size="small">
            Place order
          </Button>
        </div>
      ) : (
        ""
      )}
      <Autocomplete
        className="container"
        inputValue={selectedItem}
        onInputChange={(event, newInputValue) => {
          setSelectedItem((event) => newInputValue);
        }}
        id="controllable-states-demo"
        options={itemList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Items" />}
      />
      {selectedItemDetails ? (
        <div>
          <TextField
            value={selectedItemDetails.name}
            size="small"
            label="Name"
          ></TextField>
          <TextField
            value={editedItemQuantity}
            onChange={(e) => setEditedItemQuantity(e.target.value)}
            size="small"
            label="Quantity"
          ></TextField>
          <Select
            id="outlined-basic"
            label="Unit"
            variant="outlined"
            size="small"
            required
            value={editedItemUnit}
            onChange={(e) => setEditedItemUnit(e.target.value)}
            defaultValue={editedItemUnit}
          >
            <MenuItem value="piece">piece</MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="l">l</MenuItem>
            <MenuItem value="m">m</MenuItem>
            <MenuItem value="m2">m2</MenuItem>
            <MenuItem value="m3">m3</MenuItem>
          </Select>
          <br />
          <Button
            onClick={addToOrderList}
            variant="contained"
            size="small"
            disabled={editedItemQuantity > 0 && editedItemUnit ? false : true}
          >
            Add to list
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewOrder;