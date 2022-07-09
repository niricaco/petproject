import {
  Button,
  Input,
  Select,
  MenuItem,
  TextField,
  Container,
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
  const { userDetails, companyDetails } = useDetails();
  const { get, post } = stockApi();

  const [userList, setUserList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const promoteUser = async () => {};

  useEffect(() => {
    if (!companyDetails) return setUserList([]);
    setUserList(companyDetails.roles);
  }, [companyDetails]);

  console.log("userList", userList);
  console.log(userList[0]?.role);
  console.log(selectedRole);

  return (
    <>
      <div>
        <div>
          <Button
            onClick={() => nav("/invite")}
            variant="contained"
            size="small"
          >
            Invite
          </Button>
          <Button
            onClick={() => nav("/profile")}
            variant="contained"
            size="small"
          >
            Profile
          </Button>
        </div>
        <Container maxWidth="800px">
          <h1>Users</h1>
          {userList && userList.length !== 0 ? (
            userList.map((user) => (
              <div key={user._id}>
                <TextField value={user.email} size="small"></TextField>
                <p>
                  <Select
                    value={selectedRole}
                    defaultValue={() => setSelectedRole(user.role)}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    size="small"
                  >
                    <MenuItem
                      value="user"
                      // selected={user.role === "user" ? true : false}
                    >
                      User
                    </MenuItem>
                    <MenuItem
                      value="admin"
                      // selected={user.role === "user" ? true : false}
                    >
                      Admin
                    </MenuItem>
                    <MenuItem
                      value="owner"
                      // selected={user.role === "user" ? true : false}
                    >
                      Owner
                    </MenuItem>
                  </Select>
                  <Button
                    disabled={user.role !== selectedRole ? false : true}
                    onClick={promoteUser}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </p>
              </div>
            ))
          ) : (
            <div>No users</div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Users;
