import React, { useState } from "react";

function Homepage() {
  return (
    <div class="flex-grow-1">
      <div className="container-fluid">
        <div className="row home-page-title-color py-5">
          <div className="col-4 offset-3">
            <div className="display-5 my-2">Submit a complaint</div>
            <p class="fs-5 mt-3">
              Each week we send more than 10,000 complaints about financial
              products and services to companies for response. If another agency
              would be better able to assist, we'll send it to them and let you
              know.
            </p>
          </div>
          <div className="col-2">
            <img
              src={require("../Assets/homepage-title-photo.png")}
              class="mt-4"
              style={{
                width: "450px",
                // marginTop: "0px",
                // marginLeft: "-10px",
                maxHeight: "450px",
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
