import React from "react";
import { UserContext } from "../services/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "../axios";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [authLevel, setAuthLevel] = useState(0);

  const GetAuthLevel = async () => {
    return await axios.post("/getauthlevel", user);
  };

  useEffect(() => {
    GetAuthLevel().then((x) => {
      setAuthLevel(x.data.authLevel);
    });
  }, []);

  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark") ||
        "mycontent"
      }
    >
      <h2>Dashboard</h2>
      <h3>Hello {user.firstName}!</h3>
      {authLevel === 3 && <div>You are an admin!</div>}
      {authLevel === 1 && <div>You are a user</div>}
    </div>
  );
};

export default Dashboard;
