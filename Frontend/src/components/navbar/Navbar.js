import React, { useContext, useEffect, useState } from "react";
import "../navbar/navbar.scss";
import { HouseFill } from "react-bootstrap-icons";
import { BiUserCircle, BiUserCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import GetCookie from "../../services/GetCookie";
import { useJwt } from "react-jwt";
import { UserContext } from "../../services/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <nav className="mynavbar">
        <Link className="home-link" to="/">
          <div className="home">
            <HouseFill size="20" className="home-icon" />
          </div>
        </Link>
        <div className="center-links">
          <Link className="Link" to="/about">
            <div className="menuItem">About</div>
          </Link>
          <Link className="Link" to="/pictures">
            <div className="menuItem">Pictures</div>
          </Link>
          <Link className="Link" to="/users">
            <div className="menuItem">Users</div>
          </Link>
        </div>
        <div className="user-space">
          <div className="searchbar">
            <form>
              <input type="text" placeholder="Search..."></input>
            </form>
          </div>
          {!user && (
            <Link className="login-link" to="/login">
              <div className="login">
                <BiUserCheck size="25" />
              </div>
            </Link>
          )}
          {user.username && (
            <Link className="dashboard-link" to="/dashboard">
              <div className="logged-user">{user.username}</div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
