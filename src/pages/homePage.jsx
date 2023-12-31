import React from "react";
import "./css/globalStyles.css";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer";

function getInfoContent(props) {
  return (
    <>
      <h1 className="">{props.globalContent.homepageSectionTitle} </h1>
      <h2 className="">
        {props.globalContent.weddingDateInNumbers} |
        {props.globalContent.mainWeddingTime}
      </h2>
      <p className=" larger-font">{props.globalContent.weddingLocation}</p>
      <p onClick={() => alert("implement map")} className=" larger-font">
        {props.globalContent.homepageSectionMap}
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
          <h1 className="fancy-font">{props.globalContent.mainTitle}</h1>
          <h2 className="fancy-font">
            {props.globalContent.weddingDateInNumbers}
          </h2>
        </div>
      </div>
      <div className="page">
        <div className="page-row">
          <div className="img-container">
            <img className="test" src={props.globalContent.secondaryImageUrl} />
          </div>
          <div className="key-info-section fancy-font ">
            {getInfoContent(props)}
          </div>
        </div>
      </div>
    </div>
  );
}
