import React from "react";
import { Link } from "react-router-dom";
import "./NavigateButton.scss";

export function NavigateButton({ value, to }) {
  return (
    <Link to={to}>
      <div
        className={
          (window.localStorage.getItem("theme") === "dark" &&
            "navigate-button navigate-button-dark") ||
          "navigate-button"
        }
      >
        {value}
      </div>
    </Link>
  );
}
