import React, { useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("userUNID");

  if (!token) {
    window.location.replace("http://localhost:3000");
  }

  const handleLogOutButton = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000");
  };
  return (
    <>
      <div class="flex-grow-1 background-color d-flex">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 border border-2 border-dark my-4 ms-4">
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
              <button
                className="btn btn-lg btn-outline-success my-2 ms-4 ms-lg-0 me-5"
                onClick={handleLogOutButton}
              >
                Log out
              </button>

            </div>
            <div class="col-8"></div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
