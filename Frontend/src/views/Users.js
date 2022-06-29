import React from "react";
import { Container } from "react-bootstrap";
import { GetUsers } from "../services/UserService";

export default function Users() {
  return (
    <div className="mycontent">
      <div className="users-list">
        {GetUsers().map((x, z) => (
          <div key={z} className="userInfo">
            <span>
              <img src={x.image}></img>
            </span>
            <span>{x.firstName + " " + x.lastName}</span>
            <span>{x.email}</span>
            <span>{x.mobileNumber}</span>
            <span>{x.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
