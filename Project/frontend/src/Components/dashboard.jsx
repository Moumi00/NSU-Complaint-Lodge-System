import React, { useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("userUNID");

  const [myComplainsSelectedClass, setMyComplainSelectedClass] = useState("btn-light");
  const [reviewComplainSelectedClass, setReviewComplainSelectedClass] = useState("");

  if (!token) {
    window.location.replace("http://localhost:3000");
  }

  const handleLogOutButton = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000");
  };

  const myComplainsButtonClicked = () => {
    setMyComplainSelectedClass("btn-light");
    setReviewComplainSelectedClass("");
  }

  const reviewComplainButtonClicked = () => {
    setMyComplainSelectedClass("");
    setReviewComplainSelectedClass("btn-light");
  }
  return (
    <>
      <div class="flex-grow-1 background-color d-flex">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 border border-5 border-white rounded-3 my-4 ms-4">
              <div class="d-flex flex-column align-items-center">
                <img
                  src={require("../Assets/User-Profile.png")}
                  alt=""
                  height="150"
                  class="d-inline-block align-text-top mt-5 align-items-center justify-content-center"
                ></img>

              </div>
              <h5 class="mt-3">Name: Omar Mohammed Haroon</h5>
              <h5 class="mt-3">Email: omar.haroon@northsouth.edu</h5>
              <h5 class="mt-3">Designation: Faculty</h5>
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
              <div className="row">
                <div class="card border border-4 rounded-3 border-white m-2 background-color">
                  <div class="card-body">
                    <h3 class="card-title">Complain Title</h3>
                    <h5 class="card-text mt-4 mb-3 text-danger">Latest Comment: Upload Clear Photo</h5>
                    <div className="d-flex justify-content-between">
                      <h5 class="card-text">Complain Status: Open</h5>
                      <div>
                        <a href="#" class="btn btn-primary me-2">Check details</a>
                        <a href="#" class="btn btn-primary">Edit Complain</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="card border border-4 rounded-3 border-white m-2 background-color">
                  <div class="card-body">
                    <h3 class="card-title">Complain Title</h3>
                    <h5 class="card-text mt-4 mb-3 text-danger">Latest Comment: Upload Clear Photo</h5>
                    <div className="d-flex justify-content-between">
                      <h5 class="card-text">Complain Status: Open</h5>
                      <div>
                        <a href="#" class="btn btn-primary me-2">Check details</a>
                        <a href="#" class="btn btn-primary">Edit Complain</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
