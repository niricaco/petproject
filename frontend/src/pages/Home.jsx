import React from "react";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { counter, increment, decrement } = useCounter("Home");
  const {
    counter: globalCounter,
    increment: globalIncrement,
    decrement: globalDecrement,
  } = useGlobalCounter();

  const { token, auth } = useAuth();

  return (
    <>
      <div>Home</div>
      <p>{token ? "Logged in" : "Anonymus user"}</p>
      <p>Value: {counter}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <p>Value: {globalCounter}</p>
      <button onClick={globalIncrement}>+</button>
      <button onClick={globalDecrement}>-</button>

      <div>
        {token ? "Welcome" : <button onClick={auth}>Login with Google</button>}
      </div>
    </>
  );
};

export default Home;
