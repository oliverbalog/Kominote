import React from "react";
import "../App.scss";

export default function Pictures() {
  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark") ||
        "mycontent"
      }
    >
      <div>sadasdsa</div>
    </div>
  );
}
