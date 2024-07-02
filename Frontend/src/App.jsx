import React from "react";
import Left from "./Home/leftpart/Left";
import Right from "./Home/rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/Authprovider";
import { Routes, Route, Navigate } from "react-router-dom";
import Resetpage from "./components/Resetpage";

function App() {
  const [authUser, setauthUser] = useAuth();
  console.log(authUser);
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />

      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
      <Route path="/resetpage" element={<Resetpage />} />
    </Routes>
  );
}

export default App;
