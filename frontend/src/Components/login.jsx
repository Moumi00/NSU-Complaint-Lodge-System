import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [emailErrorClass, setEmailErrorClass] = useState("none");

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleLoginButtonClicked(e) {
    e.preventDefault();

    console.log(email)
    if (validateEmail()){
      setEmailErrorClass("block");
      return;
    }
  }

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-4 col-lg-6 col-md-8 col-11 my-4 primary-background-color px-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Login</h1>
          </div>
          <form onSubmit={handleLoginButtonClicked}>
            <div class="form-group mb-4">
              <input
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Email"
                onInput={(e)=>setEmail(e.target.value)}
                onChange={(e)=>setEmailErrorClass("none")}
              ></input>
              <span class={"text-danger d-" + emailErrorClass}>Enter a valid Email</span>
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
