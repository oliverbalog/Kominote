import React from "react";
import "../mediaItem/mediaItem.scss";
import ItemOption from "../itemOptions/itemOption";

export default function mediaItem() {
  return (
    <div>
      <div className="item">
        <ItemOption />
        <img src="https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?k=20&m=1157655660&s=612x612&w=0&h=WOtAthbmJ9iG1zbKo4kNUsAGMe6-xM-E7a8TMxb5xmk=" />
      </div>
    </div>
  );
}
