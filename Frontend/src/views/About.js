import React from "react";
import "../App.scss";

export default function About() {
  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark") ||
        "mycontent"
      }
    >
      <div>safsaf</div>
    </div>
  );
}
