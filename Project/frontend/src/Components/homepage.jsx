import React, { useState } from "react";

function Homepage() {
  return (
    <div class="flex-grow-1">
      <div className="container-fluid">
        <div className="row home-page-title-color py-5">
          <div className="col-5 offset-2">
            <div className="display-5 my-2">Submit a complaint</div>
            <p class="fs-5 mt-3">
              Each week we receive more than 100 complaints about different issues
              occuring in North South University premise. Anyone affiliated with North South University can
              lodge complaints. The complains are sent to specific reviewer
              who reviews the complain and then helps by providing a solution to the
              complaint. This website also have a mobile application where complaints can be lodged via 
              bangla speech.
            </p>
          </div>
          <div className="col-2">
            <img
              src={require("../Assets/homepage-title-photo.png")}
              class="mt-4"
              style={{
                width: "450px",
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
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Can I lodge an anonymous complaint?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    No. You must register before lodging your first complaint
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How to lodge a complaint?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    You have to create an account at first to lodge a complaint. Once you are logged in you can  Click Lodge Complaint from dashboard and provide all the details of the complaint. In addition, the system admin can lodge a complaint on behalf of you.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    How do you process the complaints?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    The complaint is first lodged by a lodger. Each complaint has a reviewer who reviews all the details. He can close the complaints once all appreciate steps are taken.
                  </div>
                </div>
              </div>
              <div class="accordion-item mb-3">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Do you have a mobile app version of the website?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    Yes. We do have a mobile app version which you can download from the playstore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
