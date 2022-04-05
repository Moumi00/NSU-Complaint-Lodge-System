import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { Modal } from "bootstrap";
import { GoogleLogin } from "react-google-login";

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
  const [error, setError] = useState("");
  const [errorClass, setErrorClass] = useState("none");
  const [googleDisabled, setGoogleDisabled] = useState(false);
  const [isNsuSignUp, setIsNsuSignUp] = useState(false);
  const [googleID, setGoogleID] = useState("");
  const [Designations, setDesignations] = useState([
    { label: "Faculty", value: 1, isDisabled: true },
    { label: "Student", value: 2, isDisabled: true },
    {
      label: "RA / TA / Lab Instructor",
      value: 3,
      isDisabled: true,
    },
    { label: "Helper", value: 4, isDisabled: true },
    { label: "Admin", value: 5, isDisabled: true },
  ]);

  const [selectedFiles, setSelectedFiles] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [idPhotoErrorClass, setIdPhotoErrorClass] = useState("none");

  const token = localStorage.getItem("userUNID");
  const clientId =
    "992655217366-qiu0iegl7kmotoovl1630k6283o0jsuk.apps.googleusercontent.com";

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) && email.length <= 320;
  } ;

  async function handleSubmit(e) {
    e.preventDefault(); //stops the page from reloading

    console.log(fullName);

    if (fullName.length < 3 || fullName.length > 30) {
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

    if (designation.length === 0) {
      setDesignationErrorClass("block");
      return;
    }

    if ((password.length < 6 || password.length > 30) && !googleDisabled) {
      setPasswordErrorClass("block");
      return;
    }

    if (confirmPassword != password && !googleDisabled) {
      setConfirmPassErrorClass("block");
      return;
    }

    console.log(selectedFiles);
    if (!isFilePicked) {
      console.log("shalalala");
      return setIdPhotoErrorClass("block");
    }
    
    if (!googleDisabled) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("nsuId", nsuId);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userType", designation);
      formData.append("file", selectedFiles);

      let response = await axios.post(
        "http://localhost:8000/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.error) {
        setErrorClass("block");
        setError(response.data.error);
        return;
      } else {
        let myModal = new Modal(document.getElementById("exampleModal"));
        myModal.show();
      }
    } else {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("nsuId", nsuId);
      formData.append("email", email);
      formData.append("googleID", googleID);
      formData.append("userType", designation);
      formData.append("file", selectedFiles);

      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }

      let response = await axios.post(
        "http://localhost:8000/auth/register/google",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.error) {
        setErrorClass("block");
        setError(response.data.error);
        return;
      } else {
        console.log(response);
        let myModal = new Modal(document.getElementById("exampleModal"));
        myModal.show();
      }
    }
  }

  const updateList = function (e) {
    e.preventDefault();
    const newFiles = e.target.files[0];
    console.log(newFiles);
    if (newFiles) {
      setIsFilePicked(true);
      setIdPhotoErrorClass("none");
    }
    setSelectedFiles(newFiles);
    e.target.value = "";
  };

  const handleCrossButton = function (e) {
    e.preventDefault();
    setSelectedFiles({});
    setIsFilePicked(false);
  };

  if (token) {
    window.location.replace("http://localhost:3000");
  }

  const onLoginSuccess = (res) => {
    setGoogleDisabled(true);
    setNameErrorClass("none");
    setNsuIdErrorClass("none");
    setEmailErrorClass("none");
    setPasswordErrorClass("none");
    setConfirmPassErrorClass("none");
    setIsFilePicked(false);
    setSelectedFiles({});
    if (res.profileObj.email.includes("northsouth.edu")) {
      setIsNsuSignUp(true);
      setFullName(res.profileObj.givenName);
      setNsuId(res.profileObj.familyName);
      setEmail(res.profileObj.email);
      setGoogleID(res.getAuthResponse().id_token);
      setDesignation("");
      if (
        res.profileObj.email.length > 13 &&
        res.profileObj.email.substring(res.profileObj.email.length - 14) ===
          "northsouth.edu"
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
          { label: "Admin", value: 5, isDisabled: false },
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
          { label: "Helper", value: 4, isDisabled: false },
          { label: "Admin", value: 5, isDisabled: true },
        ]);
      }
    } else {
      setIsNsuSignUp(false);
      setNsuId("");
      setFullName(res.profileObj.name);
      setEmail(res.profileObj.email);
      setGoogleID(res.getAuthResponse().id_token);
      setDesignation("Helper");
      if (
        res.profileObj.email.length > 13 &&
        res.profileObj.email.substring(res.profileObj.email.length - 14) ===
          "northsouth.edu"
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
          { label: "Admin", value: 5, isDisabled: false },
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
          { label: "Helper", value: 4, isDisabled: false },
          { label: "Admin", value: 5, isDisabled: true },
        ]);
      }
    }
    var profile = res.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    console.log("Login Success:", res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-4 col-lg-6 col-md-8 col-11 my-4 primary-background-color px-lg-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Register</h1>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="form-group mb-4">
              <input
                disabled={googleDisabled}
                value={fullName}
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
                Full Name can't be less than 3 characters or more than 30 characters
              </span>
            </div>
            <div class="form-group mb-4">
              <input
                disabled={isNsuSignUp}
                value={nsuId}
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
                disabled={googleDisabled}
                value={email}
                onInput={(e) => {
                  setEmail(e.target.value);
                }}
                onChange={(e) => {
                  setEmailErrorClass("none");
                  setDesignation("");
                }}
                onBlur={(e) => {
                 if (
                    email.length > 13 &&
                    email.substring(email.length - 14) === "northsouth.edu"
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
                      { label: "Admin", value: 5, isDisabled: false },
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
                      { label: "Helper", value: 4, isDisabled: false },
                      { label: "Admin", value: 5, isDisabled: true },
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
                  value={designation ? { label: designation } : null}
                  placeholder={<div style={{ color: "grey" }}>Designation</div>}
                  onChange={(e) => {
                    setDesignation(e.label);
                    setDesignationErrorClass("none");
                  }}
                />
              </div>
              <span class={"text-danger d-" + designationErrorClass}>
                Please select your designation
              </span>
            </div>
            <div
              class={"form-group mb-4 d-" + (googleDisabled ? "none" : "block")}
            >
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
                Password can't be less than 6 characters or more than 30 characters
              </span>
            </div>
            <div
              class={"form-group mb-4 d-" + (googleDisabled ? "none" : "block")}
            >
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
            <div class="form-group mb-4">
              <label class="button-attach ms-0" for="file">
                <i class="bi bi-paperclip me-1"></i>
                ID card Photo
              </label>
              <input
                accept="image/*"
                id="file"
                type="file"
                name="file"
                onChange={updateList}
              ></input>
              {isFilePicked ? (
                <div id="fileList">
                  <ul class="py-2 mb-0">
                    <li class="d-flex justify-content-between align-items-center border rounded-3 border-3 border-light bg-white mt-2 ps-2">
                      {selectedFiles.name}
                      <button
                        class="btn btn-light"
                        onClick={(e) => handleCrossButton(e)}
                      >
                        {" "}
                        x{" "}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <p class="d-none">Select a file to show details</p>
              )}
              <span class={"mb-2 text-danger d-" + idPhotoErrorClass}>
                Please attach your NSU ID card photo
              </span>
            </div>
            <div className="d-block">
              <span class={"mb-2 text-danger d-" + errorClass}>{error}</span>
              <button type="submit" class="btn btn-primary w-100 fw-bold">
                Register
              </button>
            </div>
          </form>
          <hr class="my-4" />
          <div className="d-flex justify-content-center">
            <GoogleLogin
              clientId={clientId}
              buttonText="Google Signup"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>

          {/* Modal for successful Registration */}
          <div
            class="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Registration Successful!
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {googleDisabled
                    ? "Click Ok to login"
                    : "Please verify your email."}
                </div>
                <div class="modal-footer">
                  <a className="btn btn-primary" href="/login">
                    Ok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
