import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GetUsers } from "../../services/UserService";
import "./Users.scss";
import { BiMessageRoundedDots, BiX } from "react-icons/bi";
import { QuickMessage } from "../../components/QuickMessage/QuickMessage";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState("");
  const [quickMessage, toggleQuickMessage] = useState(false);

  useEffect(() => {}, [selectedUser, quickMessage]);

  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark center-wrapper") ||
        "mycontent center-wrapper"
      }
    >
      <Col sm="8">
        <div className="users-list">
          {GetUsers().map((x, z) => (
            <div
              onClick={() => {
                setSelectedUser(x);
              }}
              key={z}
              className={
                (window.localStorage.getItem("theme") === "dark" &&
                  "user-info user-info-dark") ||
                "user-info"
              }
            >
              <span>
                <img src={x.image}></img>
              </span>
              <span>{x.firstName + " " + x.lastName}</span>
              <span>{x.email}</span>
              <span>{x.mobileNumber}</span>
            </div>
          ))}
        </div>
      </Col>

      {selectedUser && (
        <div>
          <div className="user-focus" id="user-focus">
            <div
              className={
                (window.localStorage.getItem("theme") === "dark" &&
                  "user-info user-info-dark") ||
                "user-info"
              }
            >
              <div
                onClick={() => {
                  setSelectedUser(null);
                }}
                className="close"
              >
                <BiX className="close-icon" />
              </div>
              <span>
                <img src={selectedUser.image}></img>
              </span>
              <span>
                {selectedUser.firstName + " " + selectedUser.lastName}
              </span>
              <span>{selectedUser.email}</span>
              <span>{selectedUser.mobileNumber}</span>
              <BiMessageRoundedDots
                className="send-message"
                onClick={() => {
                  toggleQuickMessage(!quickMessage);
                }}
              />
              {quickMessage && (
                <div
                  className={
                    (window.localStorage.getItem("theme") === "dark" &&
                      "quick-message quick-message-dark") ||
                    "quick-message"
                  }
                >
                  <QuickMessage />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
