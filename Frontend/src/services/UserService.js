import axios from "../axios";
import qs from "qs";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

export function GetUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function get() {
      const request = await axios.get("/users");

      setUsers(request.data);
      return request.data;
    }
    get();
  }, []);

  return users;
}

export async function CreateUser(user) {
  const request = await axios.post("/users", user);

  return request.data;
}

export async function LoginUser(user) {
  const request = await axios.post("/user", user);
  return request.data;
}
