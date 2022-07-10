import {
  Button,
  Input,
  Select,
  MenuItem,
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useAuth } from "../providers/auth";
import { stockApi } from "../apis/stockApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../providers/details";

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
      <h3>Users</h3>
      <Button onClick={() => nav("/invite")} variant="contained" size="small">
        Invite
      </Button>
      <br />
      <Button onClick={() => nav("/profile")} variant="contained" size="small">
        Profile
      </Button>
      <List
      // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {userList.map((user, key) => (
          <ListItem key={key}>
            <ListItemText primary={user.email} />
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
              <MenuItem value="storekeeper">storekeeper</MenuItem>
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
    </>
  );
};

export default Users;
