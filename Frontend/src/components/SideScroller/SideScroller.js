import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { WatchContext } from "../../services/WatchContext";
import "./SideScroller.scss";

export const SideScroller = () => {
  const { watch, setWatch } = useContext(WatchContext);

  useEffect(() => {}, [watch]);

  return (
    <div className="scroller">
      <ul className="scroller-list">
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"
            );
          }}
        >
          <div className="image-col">
            <img src="https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
            );
          }}
        >
          <div className="image-col">
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg"
            );
          }}
        >
          <div className="image-col">
            <img src="https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
            );
          }}
        >
          <div className="image-col">
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"
            );
          }}
        >
          <div className="image-col">
            <img src="https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
        <li
          className="scroller-items"
          onClick={() => {
            setWatch(
              "https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
            );
          }}
        >
          <div className="image-col">
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg" />
          </div>
          <div className="text-col">
            This is a cat, who is looking at the camera.This is a cat, who is
            looking at the camera.This is a cat, who is looking at the camera.
          </div>
        </li>
      </ul>
    </div>
  );
};
