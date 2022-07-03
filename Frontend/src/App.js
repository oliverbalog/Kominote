import "./App.css";
import "./App.scss";
import MediaItem from "./components/mediaItem/mediaItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./views/About";
import Pictures from "./views/Pictures";
import Users from "./views/Users/Users";
import Registration from "./views/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard";
import React, { Component, useContext, useEffect, useState } from "react";
import Home from "./views/Home/Home";
import { UserContext } from "./services/UserContext";
import { useJwt } from "react-jwt";
import GetCookie from "./services/GetCookie";
import { ProtectedRoute } from "./components/protected.route";
import { ThemeContext } from "./services/ThemeContext";
import axios from "./axios";

function App() {
  const [user, setUser] = useState("");
  const [colorTheme, setColorTheme] = useState("");
  //It should now send a request or something to verify if the token is expired
  const token = GetCookie("token");

  const theme = window.localStorage.getItem("theme");
  const body = document.getElementById("body");
  if (theme === "light") {
    body.setAttribute("class", "body-light");
  } else {
    body.setAttribute("class", "body-dark");
  }

  useEffect(() => {
    if (token) {
      async function checkToken(token) {
        const res = await axios.post(`/check-token`);
        return res;
      }
      checkToken().then((response) => {
        const data = response.data;
        setUser({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          email: data.email,
          mobileNumber: data.mobileNumber,
        });
      });
    }

    if (!window.localStorage.getItem("theme")) {
      window.localStorage.setItem("theme", "light");
    }
  }, [token, colorTheme]);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
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
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
