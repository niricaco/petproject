import React from "react";
import { useCounter } from "../hooks/useCounter";
import { useAuth } from "../providers/auth";
import { useCounter as useGlobalCounter } from "../providers/counter";

const Profile = () => {
  const { counter, increment, decrement } = useCounter("Profile");
  const {
    counter: globalCounter,
    increment: globalIncrement,
    decrement: globalDecrement,
  } = useGlobalCounter();

  const { token } = useAuth();

  return (
    <>
      <div>Profile</div>
      <p>{token ? "Logged in" : "Anonymus user"}</p>

      <p>Value: {counter}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <p>Value: {globalCounter}</p>
      <button onClick={globalIncrement}>+</button>
      <button onClick={globalDecrement}>-</button>
    </>
  );
};

export default Profile;
