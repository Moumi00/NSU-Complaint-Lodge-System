import React, { useState } from "react";

function Homepage() {
  return (
    <div class="flex-grow-1">
      <div className="container-fluid">
        <div className="row home-page-title-color py-5">
          <div className="col-5 offset-2">
            <div className="display-5 my-2">Submit a complaint</div>
            <p class="fs-5 mt-3">
              Each week we send more than 100 complaints about different issues
              occuring in NSU premise. If another agency would be better able to
              assist, we'll send it to them and let you know. I am just writing
              garbage right now. I will definitely change this later. And now I
              will stop.
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
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-8 offset-2 h4 fw-normal">
            Find answers before you start a complaint
          </div>
        </div>
        <div className="row">
          <div className="col-5 offset-2">
            <ul class="list-group list-group-flush">
              <li class="list-group-item py-0 pb-0 pt-3">
                <a
                  className="d-flex justify-content-between text-decoration-none"
                  data-bs-toggle="collapse"
                  href="#listOne"
                  role="button"
                  aria-expanded="false"
                  aria-controls="listOne"
                >
                  <p className="nav-link text-black m-0 p-0 pb-3 h5 fw-normal">
                    How to complain?
                  </p>
                  <p className="nav-link m-0 p-0 pt-1 h6 fw-normal align-text-bottom">
                    Show +
                  </p>
                </a>
                <div class="collapse" id="listOne">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This
                    panel is hidden by default but revealed when the user
                    activates the relevant trigger.
                  </div>
                </div>
              </li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
