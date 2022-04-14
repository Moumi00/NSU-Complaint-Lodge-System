import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useParams } from "react-router-dom";

function ComplaintDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("userUNID");

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "http://localhost:8000/home/complain-latest-details",
        {
          params: {
            complainUNID: id,
            ComplainerUNID: token,
          },
        }
      );
      if (response.data.error || response.data.data == null) {
        window.location.replace("http://localhost:3000");
      }
    }
    fetchData();
  }, []);

  return (
    <div class="flex-grow-1 background-color d-flex">
      <div className="container-fluid">
        <div className="row">
          <div class="col-7 my-4 ms-2">
            <h2 className="my-3">Complaint Details</h2>
            <div className="row">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Title</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <h5>Lale lal jalal</h5>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Description</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                  incidunt, nisi quam doloremque nostrum corrupti labore
                  distinctio repellendus! Obcaecati quae ipsa exercitationem
                  numquam ut? Totam sint similique aperiam ratione! Unde.
                </h5>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Complain Against</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <h5>Omar Haroon</h5>
                <h5>Abdullah hoga</h5>
                <h5>Omar er pasa pink</h5>
              </div>
            </div>
          </div>
          <div className="col-4 border border-5 border-white rounded-3 my-4 ms-4 card-shadow">
            <h5 className="text-center mt-3">LODGER DETAILS</h5>
            <div class="d-flex flex-column align-items-center">
              <img
                src={require("../Assets/User-Profile.png")}
                alt=""
                height="150"
                class="d-inline-block align-text-top mt-1 align-items-center justify-content-center"
              ></img>
            </div>
            <h6 class="mt-3">Name: Omar Mohammad Haroon</h6>
            <h6 class="mt-3">NSU ID: 2012012642</h6>
            <h6 class="mt-3">Email: omarharoon@gmail.com</h6>
            <h6 class="mt-3">Designation: TA</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
