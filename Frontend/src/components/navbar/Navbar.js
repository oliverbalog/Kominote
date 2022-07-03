import React, { useContext, useEffect, useState } from "react";
import "../navbar/navbar.scss";
import "../Dropdown/Dropdown.scss";
import { HouseFill, Search } from "react-bootstrap-icons";
import { BiUserCircle, BiUserCheck } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import GetCookie from "../../services/GetCookie";
import { useJwt } from "react-jwt";
import { UserContext } from "../../services/UserContext";
import { ThemeContext } from "../../services/ThemeContext";
import { Dropdown } from "react-bootstrap";
import { FiSun } from "react-icons/fi";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { colorTheme, setColorTheme } = useContext(ThemeContext);

  useEffect(() => {}, [user, colorTheme]);

  return (
    <div>
      <nav
        className={
          (window.localStorage.getItem("theme") === "dark" &&
            "mynavbar navbar-dark") ||
          "mynavbar"
        }
      >
        <div className="home-space">
          <Link className="home-link" to="/">
            <div className="home">
              <HouseFill size="20" className="home-icon" />
            </div>
          </Link>
        </div>
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
          <div className="searchbar">
            <form>
              <input type="text" placeholder="Search..."></input>
            </form>
          </div>
          <div className="theme-switch">
            {window.localStorage.getItem("theme") === "light" && (
              <MdDarkMode
                className="theme-switcher"
                onClick={() => {
                  setColorTheme("dark");
                  window.localStorage.setItem("theme", "dark");
                }}
                size="20"
              />
            )}
            {window.localStorage.getItem("theme") === "dark" && (
              <FiSun
                className="theme-switcher"
                onClick={() => {
                  setColorTheme("light");
                  window.localStorage.setItem("theme", "light");
                }}
                size="20"
              />
            )}
          </div>
        </div>
        <div className="user-space">
          {!user && (
            <Link className="login-link" to="/login">
              <div className="login">
                <BiUserCheck size="25" />
              </div>
            </Link>
          )}
          {user && (
            <div>
              <div className="logged-user">
                <Dropdown id="dropdwn" navbar>
                  <Dropdown.Toggle
                    className="dropdown-toggl"
                    variant="dark"
                    id="dropdown-autoclose-true"
                  >
                    <img src={user.image} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu id="dropdown-menux" variant="dark">
                    <Link className="dashboard-link" to="/dashboard">
                      <Dropdown.Item href="/dashboard">
                        <img src={user.image} /> {user.username}
                      </Dropdown.Item>
                    </Link>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}

          {user && (
            <div
              className="logout"
              onClick={(e) => {
                setUser(null);
                document.cookie = "token=;";
              }}
            >
              Log out
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
