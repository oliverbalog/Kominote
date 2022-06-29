import React from "react";
import { Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../services/UserContext";
import Login from "../views/Login";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);

  return user ? <Outlet /> : <Login />;
};
