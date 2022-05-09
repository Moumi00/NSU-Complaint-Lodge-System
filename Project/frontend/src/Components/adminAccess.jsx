import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function AdminAccess() {
  const [errorClass, setErrorClass] = useState("none");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("none");
  const token = localStorage.getItem("userUNID");

  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  async function handleGainAccessButtonClicked(e) {
    e.preventDefault();

    let response = await axios.post("http://localhost:8000/auth/login", {
      email: null,
      password: password,
    });

    if (response.data.error) {
      setErrorClass("block");
      setError(response.data.error);
      return;
    } else {
      localStorage.setItem("userUNID", response.data.data.userUNID);
      window.location.replace("http://localhost:3000/admin-homepage");
    }
  }

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-4 col-lg-6 col-md-8 col-11 my-4 primary-background-color px-lg-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Admin Access</h1>
          </div>
          <form onSubmit={handleGainAccessButtonClicked}>
            <div class="form-group mb-4">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Password"
                onInput={(e) => setPassword(e.target.value)}
                onChange={(e) => setErrorClass("none")}
              ></input>
            </div>
            <div className="d-block">
              <span class={"mb-2 text-danger d-" + errorClass}>{error}</span>
              <button type="submit" class="btn btn-primary w-100 fw-bold">
                Gain Access
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAccess;
