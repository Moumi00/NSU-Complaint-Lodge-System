import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useParams } from "react-router-dom";

function ComplaintDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("userUNID");
  const [complainTitle, setComplainTitle] = useState("");
  const [complainDescription, setComplainDescription] = useState("");
  const [complainAgainst, setComplainAgainst] = useState([]);
  const [lodgerName, setLodgerName] = useState("");
  const [lodgerNsuId, setLodgerNsuId] = useState("");
  const [lodgerEmail, setLodgerEmail] = useState("");
  const [lodgerDesignation, setLodgerDesignation] = useState("");

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

      setComplainTitle(response.data.data.complainTitle);
      setComplainDescription(response.data.data.ComplainDescriptions[0].complainDescription);
      setComplainAgainst(response.data.data.ComplainAgainsts.map((e)=>(e.User.fullName)));
      setLodgerName(response.data.data.User.fullName);
      setLodgerNsuId(response.data.data.User.nsuId);
      setLodgerEmail(response.data.data.User.email);
      setLodgerDesignation(response.data.data.User.userType);
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
                <h5>{complainTitle}</h5>
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
                <h5>{complainDescription}</h5>
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
                {complainAgainst.length != 0 ? (
                  complainAgainst.map((e) => <h5>{e}</h5>)
                ) : (
                  <h1></h1>
                )}
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
            <h6 class="mt-3">Name: {lodgerName}</h6>
            <h6 class="mt-3">NSU ID: {lodgerNsuId}</h6>
            <h6 class="mt-3">Email: {lodgerEmail}</h6>
            <h6 class="mt-3">Designation: {lodgerDesignation}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
