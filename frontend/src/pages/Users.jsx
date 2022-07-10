import {
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";
import "../css/Users.css";

const Users = () => {
  const navigate = useNavigate();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };
  const { userDetails, companyDetails, getCompanies } = useDetails();
  const { put } = stockApi();

  const [userList, setUserList] = useState([]);

  const promoteUser = async (user) => {
    if (user.email === userDetails.email)
      return alert("You can't promote yourself");
    console.log(user);
    const body = {
      role: user.role,
      companyId: companyDetails._id,
      email: user.email,
    };
    const response = await put("/dashboards/promote", body);
    if (response.status !== 200) return alert("Error promoting user");
    alert("User promoted");
    getCompanies();
  };

  useEffect(() => {
    if (!companyDetails) return setUserList([]);
    setUserList(companyDetails.roles);
  }, [companyDetails]);

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <section className="sectionContainerUsers">
        <h3>Users</h3>
        <Button
          style={{ marginTop: "5px", marginBottom: "5px" }}
          onClick={() => nav("/profile")}
          variant="contained"
          size="small"
        >
          Profile
        </Button>
        <br />
        <Button
          onClick={() => nav("/invite")}
          variant="contained"
          size="small"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          Invite
        </Button>
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   width: "100%",
          //   justifyContent: "space-between",
          // }}
        >
          {userList.map((user, key) => (
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
                value={user.email}
                size="small"
                label="Email"
              ></TextField>
              {/* <ListItemText primary={user.email} /> */}
              <Select
                id={user.email}
                label="Role"
                variant="outlined"
                size="small"
                defaultValue={user.role}
                onChange={(e) => {
                  user.role = e.target.value;
                }}
                required
              >
                <MenuItem value="owner">owner</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
                <MenuItem value="storekeeper">store</MenuItem>
              </Select>
              <Button
                variant="contained"
                size="small"
                onClick={() => promoteUser(user)}
              >
                Save
              </Button>
            </ListItem>
          ))}
        </List>
      </section>
    </>
  );
};

export default Users;
