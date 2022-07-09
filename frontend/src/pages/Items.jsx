import React from "react";
import { Button, Input, Autocomplete, TextField } from "@mui/material";
import "../css/Items.css";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";
import { useEffect } from "react";

const Items = () => {
  const navigate = useNavigate();
  const { companyDetails, getCompanies } = useDetails();
  const { put } = stockApi();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemDetails, setSelectedItemDetails] = useState({});
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemQuantity, setEditedItemQuantity] = useState("");
  const [editedItemUnit, setEditedItemUnit] = useState("");

  const filterItems = () => {
    const filteredItems = companyDetails.items.map((item) => {
      console.log(item.name);
      return item.name;
      // return item.name.toLowerCase().includes(itemName.toLowerCase());
    });
    setItemList(filteredItems);
  };

  const getItemDetails = () => {
    const item = companyDetails.items.filter((item) => {
      return item.name === selectedItem;
    });
    setSelectedItemDetails(item[0]);
  };

  const updateItem = async () => {
    const body = {
      companyId: companyDetails._id,
      item: {
        itemId: selectedItemDetails._id,
        name: selectedItemDetails.name,
        quantity: selectedItemDetails.quantity,
        unit: selectedItemDetails.unit,
      },
    };
    const response = await put("/dashboards/item", body);
    console.log(response.data);
    if (response.status !== 200) return alert("Error updating item");
    getCompanies();
    setSelectedItem("");
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

  useEffect(() => {
    if (selectedItemDetails) {
      setEditedItemName(selectedItemDetails.name);
      setEditedItemQuantity(selectedItemDetails.quantity);
      setEditedItemUnit(selectedItemDetails.unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemDetails]);

  return (
    <>
      <section>
        <div>Items</div>
        {companyDetails ? (
          <div className="companyDetails container">
            <div>
              <Button
                onClick={() => nav("/new-item")}
                variant="contained"
                size="small"
              >
                Add new item
              </Button>
              <Button
                onClick={() => nav("/profile")}
                variant="contained"
                size="small"
              >
                Profile
              </Button>
            </div>
            <div>
              <Autocomplete
                className="container"
                inputValue={selectedItem}
                onInputChange={(event, newInputValue) => {
                  setSelectedItem(newInputValue);
                }}
                id="controllable-states-demo"
                options={itemList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Items" />
                )}
              />
              {selectedItemDetails ? (
                <div className="selectedItemDetails container">
                  <div>
                    <TextField
                      value={editedItemName}
                      onChange={(e) => setEditedItemName(e.target.value)}
                      size="small"
                      label="Name"
                    ></TextField>
                    <TextField
                      value={editedItemQuantity}
                      onChange={(e) => setEditedItemQuantity(e.target.value)}
                      size="small"
                      label="Quantity"
                    ></TextField>
                    <br />
                    <Button
                      onClick={updateItem}
                      variant="contained"
                      size="small"
                      disabled={
                        selectedItemDetails.name !== editedItemName ||
                        Number(selectedItemDetails.quantity) !==
                          Number(editedItemQuantity) ||
                        selectedItemDetails.unit !== editedItemUnit
                          ? false
                          : true
                      }
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                "No item selected"
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Items;
