import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplainRow from "./complainRow";

function Dashboard() {
  const token = localStorage.getItem("userUNID");

  const [name, setName] = useState("");
  const [nsuId, setNsuId] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [complainList, setComplainList] = useState([]);
  const [myComplainsSelectedClass, setMyComplainSelectedClass] = useState("btn-light card-shadow");
  const [reviewComplainSelectedClass, setReviewComplainSelectedClass] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "http://localhost:8000/home/user-details",
        {
          params: {
            userUNID: token
          }
        }
      );

      setName(response.data.data.fullName);
      setNsuId(response.data.data.nsuId);
      setEmail(response.data.data.email);
      setDesignation(response.data.data.userType);
      setComplainList(response.data.data.Complains);
      console.log(response.data.data.Complains)
    }
    fetchData();
  }, []);

  if (!token) {
    window.location.replace("http://localhost:3000");
  }

  const handleLogOutButton = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000");
  };

  const myComplainsButtonClicked = () => {
    setMyComplainSelectedClass("btn-light card-shadow");
    setReviewComplainSelectedClass("");
  }

  const reviewComplainButtonClicked = () => {
    setMyComplainSelectedClass("");
    setReviewComplainSelectedClass("btn-light card-shadow");
  }
  return (
    <>
      <div class="flex-grow-1 background-color d-flex">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 border border-5 border-white rounded-3 my-4 ms-4 card-shadow">
              <div class="d-flex flex-column align-items-center">
                <img
                  src={require("../Assets/User-Profile.png")}
                  alt=""
                  height="150"
                  class="d-inline-block align-text-top mt-5 align-items-center justify-content-center"
                ></img>

              </div>
              <h5 class="mt-3">Name: {name}</h5>
              <h5 class="mt-3">NSU ID: {nsuId}</h5>
              <h5 class="mt-3">Email: {email}</h5>
              <h5 class="mt-3">Designation: {designation}</h5>
              <div className="d-block mt-4">
                <button
                  className="btn btn-primary my-2 ms-4 ms-lg-0 me-5 w-100"
                  onClick={handleLogOutButton}
                >
                  Log out
                </button>
              </div>

            </div>
            <div class="col-7 my-4 ms-4">
              <button type="button" class={"btn " + myComplainsSelectedClass} onClick={myComplainsButtonClicked}>My Complain(s)</button>
              <button type="button" class={"btn " + reviewComplainSelectedClass} onClick={reviewComplainButtonClicked}>Review Complain(s)</button>
              {complainList.map((e) => (
                  <ComplainRow complain={e} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
