import React from "react";
import "./css/globalStyles.css";
import secondaryImage from "../assets/proposal.jpg";

function getInfoContent(props) {
  return (
    <>
      <h1>{props.globalContent.homepageSectionTitle} </h1>
      <p className=" larger-font">
        {props.globalContent.weddingDateInNumbers} |
        {props.globalContent.mainWeddingTime}
      </p>
      <p className=" larger-font">{props.globalContent.weddingLocation}</p>
      {props.globalContent.homepageSectionMap && (
        <>
          <p
            onClick={() =>
              window.location.replace(props.globalContent.homepageMapUrl)
            }
            className=" larger-font"
            id="map-button"
          >
            {props.globalContent.homepageSectionMap}
          </p>
        </>
      )}
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
          <h1 className="fancy-font white-font">
            {props.globalContent.mainTitle}
          </h1>
          <h2 className="fancy-font white-font">
            {props.globalContent.weddingDateInNumbers}
          </h2>
        </div>
      </div>
      <div className="page">
        <div className="page-row">
          <div className="img-container">
            <img className="test" src={secondaryImage} />
          </div>
          <div className="key-info-section fancy-font ">
            {getInfoContent(props)}
          </div>
        </div>
      </div>
    </div>
  );
}
