import React from "react";
import mainLogoImg from "../assets/fp_logo_ohk.png";
import "./MainLogo.css";

export function MainLogo(props) {
  return (
    <>
      <img src={mainLogoImg} className="mainLogo"></img>
      <div className="mainLogoDiv">{props.children}</div>
    </>
  );
}
