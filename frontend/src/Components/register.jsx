import React, { useState } from "react";
import Select from "react-select";

function Register() {
  const [fullName, setFullName] = useState("");
  const [nsuId, setNsuId] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameErrorClass, setNameErrorClass] = useState("none");
  const [nsuIdErrorClass, setNsuIdErrorClass] = useState("none");
  const [emailErrorClass, setEmailErrorClass] = useState("none");
  const [designationErrorClass, setDesignationErrorClass] = useState("none");
  const [passwordErrorClass, setPasswordErrorClass] = useState("none");
  const [confirmPassErrorClass, setConfirmPassErrorClass] = useState("none");
  const [Designations, setDesignations] = useState([
    { label: "Faculty", value: 1, isDisabled: true },
    { label: "Student", value: 2, isDisabled: true },
    {
      label: "RA / TA / Lab Instructor",
      value: 3,
      isDisabled: true,
    },
    { label: "Helper", value: 4, isDisabled: true },
  ]);

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleSubmit(e) {
    e.preventDefault(); //stops the page from reloading

    console.log(designation);

    if (fullName.length < 3) {
      setNameErrorClass("block");
      return;
    }

    console.log(nsuId);
    if (nsuId.length != 10) {
      setNsuIdErrorClass("block");
      return;
    }

    if (!validateEmail()) {
      setEmailErrorClass("block");
      return;
    }
    
    if (designation.length === 0){
      setDesignationErrorClass("block");
      return;
    }

    if (password.length < 6) {
      setPasswordErrorClass("block");
      return;
    }

    if (confirmPassword != password) {
      setConfirmPassErrorClass("block");
      return;
    }


    // let response = await axios.post("http://localhost:8000/login", {

    //   fullName: fullName,
    //   nsuId: nsuId,
    //   email: email,
    //   password: password,
    // });


  }

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-4 col-lg-6 col-md-8 col-11 my-4 primary-background-color px-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="form-group mb-4">
              <input
                onInput={(e) => {
                  setFullName(e.target.value);
                }}
                onChange={(e) => {
                  setNameErrorClass("none");
                }}
                type="text"
                class="form-control"
                id="fullNameInput"
                placeholder="Full Name"
              ></input>
              <span class={"text-danger d-" + nameErrorClass}>
                Full Name can't be less than 3 digits
              </span>
            </div>
            <div class="form-group mb-4">
              <input
                onInput={(e) => {
                  setNsuId(e.target.value);
                }}
                onChange={(e) => {
                  setNsuIdErrorClass("none");
                }}
                type="text"
                class="form-control"
                id="nsuIdInput"
                placeholder="NSU ID"
              ></input>
              <span class={"text-danger d-" + nsuIdErrorClass}>
                Enter a valid NSU ID
              </span>
            </div>
            <div class="form-group mb-4">
              <input
                onInput={(e) => {
                  setEmail(e.target.value);
                }}
                onChange={(e) => {
                  setEmailErrorClass("none");
                }}
                onBlur={(e) => {
                  if (
                    email.length > 8 &&
                    email.substring(email.length - 3) === "com"
                  ) {
                    setDesignations([
                      { label: "Faculty", value: 1, isDisabled: true },
                      { label: "Student", value: 2, isDisabled: true },
                      {
                        label: "RA / TA / Lab Instructor",
                        value: 3,
                        isDisabled: true,
                      },
                      { label: "Helper", value: 4, isDisabled: false },
                    ]);
                  } else if (
                    email.length > 13 &&
                    email.substring(email.length - 3) === "edu"
                  ) {
                    setDesignations([
                      { label: "Faculty", value: 1, isDisabled: false },
                      { label: "Student", value: 2, isDisabled: false },
                      {
                        label: "RA / TA / Lab Instructor",
                        value: 3,
                        isDisabled: false,
                      },
                      { label: "Helper", value: 4, isDisabled: true },
                    ]);
                  } else {
                    setDesignations([
                      { label: "Faculty", value: 1, isDisabled: true },
                      { label: "Student", value: 2, isDisabled: true },
                      {
                        label: "RA / TA / Lab Instructor",
                        value: 3,
                        isDisabled: true,
                      },
                      { label: "Helper", value: 4, isDisabled: true },
                    ]);
                  }
                }}
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Email"
              ></input>
              <span class={"text-danger d-" + emailErrorClass}>
                Enter a valid email
              </span>
            </div>
            <div className="form-group d-flex flex-column mb-4">
              <div className="col-12">
                <Select
                  options={Designations}
                  placeholder={<div style={{ color: "grey" }}>Designation</div>}
                  onChange={(e)=>{
                    setDesignation(e.label);
                    setDesignationErrorClass("none");
                  }}
                  // value={designation}
                />
              </div>
              <span class={"text-danger d-" + designationErrorClass}>
                Please select your designation
              </span>
            </div>
            <div class="form-group mb-4">
              <input
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
                onChange={(e) => {
                  setPasswordErrorClass("none");
                }}
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Password"
              ></input>
              <span class={"text-danger d-" + passwordErrorClass}>
                Password can't be less than 6 characters
              </span>
            </div>
            <div class="form-group mb-4">
              <input
                onInput={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                onChange={(e) => {
                  setConfirmPassErrorClass("none");
                }}
                type="password"
                class="form-control"
                id="confirmPasswordInput"
                placeholder="Confirm Password"
              ></input>
              <span class={"text-danger d-" + confirmPassErrorClass}>
                Password doesn't match
              </span>
            </div>
            <div className="d-block">
              <button type="submit" class="btn btn-primary w-100 fw-bold">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
