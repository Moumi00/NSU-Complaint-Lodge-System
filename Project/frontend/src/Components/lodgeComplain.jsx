import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal } from "bootstrap";
import axios from "axios";

function LodgeComplaint() {
  const [complainAgainstOptions, setComplainAgainstOptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [openCompAgainstMenu, setOpenCompAgainstMenu] = useState(false);
  const [openCompReviewerMenu, setOpenCompReviewerMenu] = useState(false);
  const [complainTitle, setComplainTitle] = useState("");
  const [complainDescription, setComplainDescription] = useState("");
  const [complainAgainst, setComplainAgainst] = useState([]);
  const [reviewer, setReviewer] = useState("");
  const [complainTitleErrorClass, setComplainTitleErrorClass] =
    useState("none");
  const [complainDescriptionErrorClass, setComplainDescriptionErrorClass] =
    useState("none");
  const [complainAgainstErrorClass, setComplainAgainstErrorClass] =
    useState("none");
  const [reviewerErrorClass, setReviewerErrorClass] = useState("none");
  const [evidenceErrorClass, setEvidenceErrorClass] = useState("none");
  const [reviewerOptions, setReviewerOptions] = useState([]);
  const token = localStorage.getItem("userUNID");

  if (!token) {
    window.location.replace("http://localhost:3000/login");
  }

  useEffect(() => {
    async function fetchData() {
      // let response = await axios.get("http://localhost:8000/home/users");
      // //console.log(response);
      // let temp = response.data.data.map((data) => ({
      //   label: data.fullName,
      //   value: data.userUNID,
      //   isDisabled: token == data.userUNID ? true : false,
      // }));
      // console.log(temp);
      // setComplainAgainstOptions(temp);
      // response = await axios.get("http://localhost:8000/home/reviewers");
      // console.log(response.data.data);
      // let temp1 = response.data.data.map((data) => ({
      //   label: data.fullName,
      //   value: data.userUNID,
      //   isDisabled: true,
      // }));
      // console.log(temp1);
      // setReviewerOptions(temp1);
    }
    fetchData();
  }, []);

  const updateList = function (e) {
    e.preventDefault();
    const newFiles = selectedFiles.slice();
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }
    if (newFiles.length > 0) {
      setIsFilePicked(true);
      setEvidenceErrorClass("none");
    }
    setSelectedFiles(newFiles);
    e.target.value = "";
  };

  const handleCrossButton = function (e, index) {
    e.preventDefault();
    console.log(index);
    const newFiles = selectedFiles.slice();
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    console.log(newFiles);
  };

  const handleComplainAgainstOnChange = (e) => {
    setOpenCompAgainstMenu(false);
    setComplainAgainstErrorClass("none");
    const temp = [];
    for (let i = 0; i < e.length; i++) {
      temp.push(e[i].value);
    }
    setComplainAgainst(temp);
    let temp1 = reviewerOptions;

    console.log(temp);
    temp1.map(
      (data) =>
        temp.some((e) => e == data.value) || data.value == token
          ? (data.isDisabled = true)
          : (data.isDisabled = false)
      //console.log(data.value)
    );
    console.log(temp1);
    setReviewerOptions(temp1);
  };

  const handleReviewerOnChange = (e) => {
    setOpenCompReviewerMenu(false);
    setReviewerErrorClass("none");
    setReviewer(e.value);
  };

  async function handleLodgeComplaintButtonClicked(e) {
    e.preventDefault();
    if (!complainTitle) {
      return setComplainTitleErrorClass("block");
    }
    if (!complainDescription) {
      return setComplainDescriptionErrorClass("block");
    }
    if (complainAgainst.length === 0) {
      return setComplainAgainstErrorClass("block");
    }
    if (!isFilePicked) {
      return setEvidenceErrorClass("block");
    }
    if (!reviewer) {
      return setReviewerErrorClass("block");
    }
    console.log(selectedFiles);

    const formData = new FormData();
    formData.append("complainerUNID", token);
    formData.append("complainTitle", complainTitle);
    formData.append("complainDescription", complainDescription);
    // for (var i = 0; i < complainAgainst.length; i++) {
    //   formData.append('complainAgainstUserUNID[]', complainAgainst[i]);
    // }
    // complainAgainst.forEach((item) => formData.append("complainAgainstUserUNID[]", item))
    formData.append("complainAgainstUserUNID", JSON.stringify(complainAgainst));
    formData.append("complainReviewerUserUNID", reviewer);
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    let response = await axios.post(
      "http://localhost:8000/home/lodge-complaint",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    if (response.data.data) {
      let myModal = new Modal(document.getElementById("exampleModal"));
      myModal.show();
    }
  }

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-5 col-lg-7 col-md-9 col-11 my-4 primary-background-color px-lg-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Lodge Complaint</h1>
          </div>
          <form onSubmit={handleLodgeComplaintButtonClicked}>
            <div class="form-group mb-4">
              <input
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Complain Title"
                onInput={(e) => {
                  setComplainTitle(e.target.value);
                }}
                onChange={(e) => {
                  setComplainTitleErrorClass("none");
                }}
              ></input>
              <span class={"text-danger d-" + complainTitleErrorClass}>
                Enter Complaint Title.
              </span>
            </div>
            <div class="form-group mb-4">
              <textarea
                class="form-control"
                id="form4Example3"
                rows="6"
                placeholder="Complain Description (upto 150 words)"
                style={{ resize: "none" }}
                onInput={(e) => {
                  setComplainDescription(e.target.value);
                }}
                onChange={(e) => {
                  setComplainDescriptionErrorClass("none");
                }}
              ></textarea>
              <span class={"text-danger d-" + complainDescriptionErrorClass}>
                Enter Complaint Description.
              </span>
            </div>
            <div className="form-group d-flex flex-column mb-4">
              <div className="col-12">
                <Select
                  options={complainAgainstOptions}
                  placeholder={
                    <div style={{ color: "grey" }}>Complain Against</div>
                  }
                  components={{
                    DropdownIndicator: () => null, // Remove dropdown icon
                    IndicatorSeparator: () => null, // Remove separator
                  }}
                  isMulti
                  onChange={handleComplainAgainstOnChange}
                  onBlur={(e) => {
                    setOpenCompAgainstMenu(false);
                  }}
                  onInputChange={async (e, { action }) => {
                    let response = await axios.get(
                      "http://localhost:8000/home/complain-against",
                      {
                        query: e,
                        userUNID: token,
                      }
                    );
                    let temp = response.data.data.map((data) => ({
                      label: data.fullName,
                      value: data.userUNID,
                    }));
                    setComplainAgainstOptions(temp);
                    console.log(e);
                    console.log(response);
                    if (e.length === 0) {
                      setOpenCompAgainstMenu(false);
                      return;
                    }
                    if (action === "input-change") {
                      setOpenCompAgainstMenu(true);
                    }
                  }}
                  menuIsOpen={openCompAgainstMenu}
                />
                <span class={"text-danger d-" + complainAgainstErrorClass}>
                  Select user(s) to complain against.
                </span>
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="button-attach ms-0" for="file">
                <i class="bi bi-paperclip me-1"></i>
                Evidence
              </label>
              <input
                accept="image/*, application/pdf"
                id="file"
                type="file"
                name="file"
                multiple
                onChange={updateList}
              ></input>
              {isFilePicked ? (
                <div id="fileList">
                  <ul class="py-2 mb-0">
                    {selectedFiles.map((k, index) => (
                      <li class="d-flex justify-content-between align-items-center border rounded-3 border-3 border-light bg-white mt-2 ps-2">
                        {k.name}
                        <button
                          class="btn btn-light"
                          onClick={(e) => handleCrossButton(e, index)}
                        >
                          {" "}
                          x{" "}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p class="d-none">Select a file to show details</p>
              )}
              <span class={"mb-2 text-danger d-" + evidenceErrorClass}>
                Please attach evidence(s)
              </span>
            </div>
            <div className="form-group d-flex flex-column mb-4">
              <div className="col-12">
                <Select
                  options={reviewerOptions}
                  // value={reviewer ? { label: reviewer } : null}
                  placeholder={
                    <div style={{ color: "grey" }}>
                      Choose Reviewer(only one)
                    </div>
                  }
                  components={{
                    DropdownIndicator: () => null, // Remove dropdown icon
                    IndicatorSeparator: () => null, // Remove separator
                  }}
                  onChange={handleReviewerOnChange}
                  onBlur={(e) => {
                    setOpenCompReviewerMenu(false);
                  }}
                  onInputChange={(e, { action }) => {
                    if (e.length === 0) {
                      setOpenCompReviewerMenu(false);
                      return;
                    }
                    if (action === "input-change") {
                      setOpenCompReviewerMenu(true);
                    }
                  }}
                  menuIsOpen={openCompReviewerMenu}
                />
                <span class={"text-danger d-" + reviewerErrorClass}>
                  Select a complain reviewer.
                </span>
              </div>
            </div>
            <div className="d-block">
              <button type="submit" class="btn btn-primary w-100 fw-bold">
                Lodge Complaint
              </button>
            </div>
          </form>
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
                    Lodged Complaint Successfully!
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">Click OK to continue</div>
                <div class="modal-footer">
                  <a className="btn btn-primary" href="/">
                    OK
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

export default LodgeComplaint;
