import React from 'react';
import mainLogoImg from "./assets/fp_logo.jpeg"
import "./MainLogo.css"

export function MainLogo (props) {
    return(
        <>
        <img src={mainLogoImg} className='mainLogo'></img>
        <div style={{fontWeight: "bold"}}>
        {props.children}
        </div>
        </>
    )
}