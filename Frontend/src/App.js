import "./App.css";
import "./App.scss";
import MediaItem from "./components/mediaItem/mediaItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./views/About";
import Pictures from "./views/Pictures";
import Users from "./views/Users";
import Registration from "./views/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import React, { Component, useContext, useEffect, useState } from "react";
import Home from "./views/Home";
import { UserContext } from "./services/UserContext";
import { useJwt } from "react-jwt";
import GetCookie from "./services/GetCookie";
import { ProtectedRoute } from "./components/protected.route";

function App() {
  const [user, setUser] = useState("");
  //It should now send a request or something to verify if the token is expired
  const { decodedToken, isExpired } = useJwt(GetCookie("token"));
  const asd = useJwt(GetCookie("token"));

  useEffect(() => {
    if (decodedToken) {
      const expired = Date.now() >= new Date(decodedToken.exp * 1000);

      if (!expired) {
        const userinfo = decodedToken.userInfo;
        setUser({
          username: userinfo.username,
          firstName: userinfo.firstName,
          lastName: userinfo.lastName,
          image: userinfo.image,
        });
      } else {
        setUser("");
      }
    }
  }, [decodedToken]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="pictures" element={<Pictures />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="registration" element={<Registration />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
