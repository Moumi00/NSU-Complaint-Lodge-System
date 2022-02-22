import React, { useState } from "react";

function Register() {
  return (
    <div class="flex-grow-1">
      <div class="row justify-content-center mt-4">
        <div className="col-3 align-self-center">
          <img
            src={require("../Assets/register-logo.png")}
            style={{ maxWidth: "100%" }}
          ></img>
        </div>
        <div class="col-4 bg-light">
          <form>
            <div class="form-group mb-3">
              <label for="fullNameInput">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="fullNameInput"
                placeholder="Enter Full Name"
              ></input>
            </div>
            <div class="form-group mb-3">
              <label for="idInput">NSU ID</label>
              <input
                type="text"
                class="form-control"
                id="idInput"
                placeholder="Enter NSU ID"
              ></input>
            </div>
            <div class="form-group mb-3">
              <label for="emailInput">Email address</label>
              <input
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Enter email"
              ></input>
            </div>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              ></input>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
