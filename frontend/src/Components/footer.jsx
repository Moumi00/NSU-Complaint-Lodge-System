import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFax, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
  } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <footer class="footer full-color">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              src={require("../Assets/logo.png")}
              style={{width:"300px",marginTop:"0px",marginLeft:"-10px", maxHeight:"50px"}}
            >
            </img>
            <p>
              Bashundhara, Dhaka-1229, Bangladesh
              <br />
              <FontAwesomeIcon icon={faPhone}/> +880-2-55668200
              &nbsp;&nbsp;|&nbsp;&nbsp; <FontAwesomeIcon icon={faFax}/> Fax:
              +880-2-55668202
              <br />
              <FontAwesomeIcon icon={faEnvelope}/> registrar@northsouth.edu
            </p>
          </div>
          <div class="col-md-6">
            <div class="social-box">
              <ul class="social-list">
                <li>
                  <a
                    href="https://www.facebook.com/NorthSouthUniversity"
                    class="btn btn-default social-icon"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFacebook}/>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/NorthSouthU"
                    class="btn btn-default social-icon"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faTwitter}/>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/NorthSouthUniversity/"
                    class="btn btn-default social-icon"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faInstagram}/>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/NorthSouthUniversity"
                    class="btn btn-default social-icon"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faYoutube}/>
                  </a>
                </li>
              </ul>
              <div class="clearfix"></div>
            </div>
            <div class="copyright">
              Developed & Maintained by IT Office, NSU
              <br /> &copy; 1993-2021 North South University. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
