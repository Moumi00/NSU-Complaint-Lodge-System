import React, { useState } from "react";
import Select from "react-select";

function LodgeComplain() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const updateList = function () {
    var input = document.getElementById("file");
    var output = document.getElementById("fileList");
    var children = "";

    for (var i = 0; i < input.files.length; ++i) {
      children +=
        "<li class='d-flex justify-content-between align-items-center'>" +
        input.files.item(i).name +
        "<button class='btn btn-light'> x </button> </li>";
    }
    console.log(children);

    if (input.files.length != 0) {
      output.classList.add(
        "border",
        "rounded-3",
        "border-3",
        "border-light",
        "bg-white",
        "mt-2"
      );
    } else {
      output.classList.remove(
        "border",
        "rounded-3",
        "border-3",
        "border-light",
        "bg-white",
        "mt-2"
      );
    }

    output.innerHTML = "<ul class='p-2 mb-0'>" + children + "</ul>";
  };

  return (
    <div class="flex-grow-1 background-color d-flex align-items-center justify-content-center">
      <div class="row justify-content-center w-100">
        <div class="col-xl-5 col-lg-7 col-md-9 col-11 my-4 primary-background-color px-lg-5 pb-5">
          <div class="separator my-5 ">
            <h1 className="text-dark fw-light">Lodge Complain</h1>
          </div>
          <form>
            <div class="form-group mb-4">
              <input
                type="text"
                class="form-control"
                id="emailInput"
                placeholder="Complain Title"
              ></input>
            </div>
            <div class="form-group mb-4">
              <textarea
                class="form-control"
                id="form4Example3"
                rows="6"
                placeholder="Complain Description (upto 150 words)"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column mb-4">
              <div className="col-12">
                <Select
                  options={options}
                  placeholder={
                    <div style={{ color: "grey" }}>Complain Against</div>
                  }
                  components={{
                    DropdownIndicator: () => null, // Remove dropdown icon
                    IndicatorSeparator: () => null, // Remove separator
                  }}
                  isMulti
                />
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="button-attach" for="file">
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
              <div id="fileList"></div>
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

export default LodgeComplain;
