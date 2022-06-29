import React from "react";
import "../itemOptions/itemOption.scss";
import { JournalPlus, InfoLg } from "react-bootstrap-icons";

export default function itemOption() {
  return (
    <div className="itemOptions">
      <div className="option">
        <a href="/">
          <JournalPlus className="option-icon" />
        </a>
      </div>
      <div className="option">
        <a href="/">
          <InfoLg className="option-icon" />
        </a>
      </div>
    </div>
  );
}
