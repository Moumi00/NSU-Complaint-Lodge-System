import React, { useState } from "react";

function Login() {
  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-4 col-lg-6 col-md-8 col-11 my-4 primary-background-color px-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Login</h1>
          </div>
          <form>
            <div class="form-group mb-4">
              <input
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Email"
              ></input>
            </div>
            <div class="form-group mb-4">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Password"
              ></input>
            </div>

            <div className="d-block">
              <button type="submit" class="btn btn-primary w-100 fw-bold">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
