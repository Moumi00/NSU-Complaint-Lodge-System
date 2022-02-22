import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg primary-color">
        <div class="container-fluid">
          <a class="navbar-brand ms-5" href="#">
            <img
              src={require("../Assets/logo.png")}
              alt=""
              height="100"
              class="d-inline-block align-text-top"
            ></img>
          </a>
          <button
            class="navbar-toggler border border-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon d-flex justify-content-center align-items-center">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-lg btn-outline-success my-2 ms-4 ms-lg-0 me-5" href="#">
                  Lodge Complain
                </button>
              </li>
              <li className="nav-item me-2">
                <button className="btn btn-lg btn-outline-success my-2 ms-4 me-2" href="#">
                  Signup
                </button>
              </li>
              <li>
                <button className="btn btn-lg btn-outline-success my-2 ms-4 ms-lg-0 me-5" href="#">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
