// import React from 'react'
import logoblack from "../assets/LogoBlack.png";
import "../Styles/Footer.css";
//import TransalateButton from "./TransalateButton";

const Footer = () => {
  return (
    <>
      <hr></hr>
      <footer>
        <div className="left-footer">
          <div className="left-footer-element">
            <h3>Company</h3>
            <p>• FAQs</p>
            <p>• About us</p>
            <p>• Contact us</p>
          </div>
          <div className="left-footer-element">
            <h3>Services</h3>
            <p>• Home</p>
            <p>• Faculty</p>
            <p>• Student</p>
          </div>
          <div className="left-footer-element">
            <h3>Legal</h3>
            <p>• Terms and conditions</p>
            <p>• Privacy policy</p>
          </div>
        </div>
        <img className="right-footer" src={logoblack}></img>
      </footer>
    </>
  );
};

export default Footer;
