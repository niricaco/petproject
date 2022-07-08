import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Invite from "./pages/Invite";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/users"
            element={
              <Protected>
                <Users />
              </Protected>
            }
          />
          <Route
            path="/invite"
            element={
              <Protected>
                <Invite />
              </Protected>
            }
          />
          <Route path="/callback/:provider" element={<Callback />} />
          <Route
            path="/register"
            element={
              <Protected>
                <Register />
              </Protected>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
