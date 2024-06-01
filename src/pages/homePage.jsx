import React from "react";
import "./css/globalStyles.css";

function getInfoContent(props) {
  return (
    <>
      <p
        className="fancy-font"
        id="map-button"
        onClick={() =>
          window.location.replace(props.globalContent.homepageMapUrl)
        }
      >
        {props.globalContent.weddingLocation}
      </p>

      <button
        onClick={() => {
          window.location.replace(props.globalContent.homePageButtonUrl);
        }}
        className="btn-link fancy-font "
      >
        {props.globalContent.homepageButtonText}
      </button>
    </>
  );
}
export default function Homepage(props) {
  return (
    <div className="home-container">
      <div className="bg">
        <div className="center-page">
          <h1 className="fancy-font secondary-font">
            {props.globalContent.mainTitle}
          </h1>
          <h2 className="fancy-font secondary-font">
            {props.globalContent.weddingDateInNumbers}
          </h2>
          <div className="key-info-section fancy-font ">
            {getInfoContent(props)}
          </div>
        </div>
      </div>
    </div>
  );
}
