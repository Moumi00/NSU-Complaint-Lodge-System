import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function LodgeComplain() {
  const [options, setOptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:8000/home/users");
      console.log(response.data.data);
      setOptions(response.data.data);
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
                  options={options.fullName}
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
                  <ul class="py-2 px-0 mb-0">
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
            </div>
            <div className="form-group d-flex flex-column mb-4">
              <div className="col-12">
                <Select
                  options={options}
                  placeholder={
                    <div style={{ color: "grey" }}>Choose Reviewer(only one)</div>
                  }
                  components={{
                    DropdownIndicator: () => null, // Remove dropdown icon
                    IndicatorSeparator: () => null, // Remove separator
                  }}
                />
              </div>
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
