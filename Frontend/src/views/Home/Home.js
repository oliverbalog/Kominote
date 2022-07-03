import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../App.scss";
import { SideScroller } from "../../components/SideScroller/SideScroller";
import "./Home.scss";
import { WatchContext } from "../../services/WatchContext";

const Home = () => {
  const [watch, setWatch] = useState("");

  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark") ||
        "mycontent"
      }
    >
      <div className="center-wrapper">
        <Col sm="8">
          <Row>
            <Col sm="3">
              <WatchContext.Provider value={{ watch, setWatch }}>
                <SideScroller />
              </WatchContext.Provider>
            </Col>
            <Col sm="9">
              <div className="home-content">
                <img src={watch} />
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Home;
