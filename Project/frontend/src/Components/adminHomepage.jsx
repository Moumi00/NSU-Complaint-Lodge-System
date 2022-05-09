import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useNavigate } from "react-router-dom";

function AdminHomepage() {
  const ref = document.referrer;
  let navigate = useNavigate();
  const [openCompLodgerMenu, setOpenCompLodgerMenu] = useState(false);
  const [newLodger, setNewLodger] = useState("");
  const [newLodgerErrorClass, setNewLodgerErrorClass] = useState("none");

  useEffect(() => {
    async function fetchData() {
      if (!ref){
        window.location.replace("http://localhost:3000");
      }
    }
    fetchData();
  }, []);

  const handleLodgerOnChange = (e) => {
    setOpenCompLodgerMenu(false);
    setNewLodgerErrorClass("none");
    setNewLodger(e.value);
  };

  const handleLodgeComplainClick = () => {
    if (!newLodger){
      setNewLodgerErrorClass("block");
      return;
    }
    navigate("/lodge-complaint", { state: newLodger });
    window.location.reload();
  }

  const fetchLodgerData = async (input, callback) => {
    let response = await axios.get("http://localhost:8000/home/all", {
      params: {
        query: input,
      },
    });
    callback(
      response.data.data.map((i) => ({
        label: i.uniqueDetail,
        value: i.userUNID,
      }))
    );
  };
  return (
    <div class="flex-grow-1 d-flex align-items-center">
      <div className="row w-100 justify-content-center">
        <div class="d-grid gap-4 col-4">
          <a
            class="btn admin-button-color btn-lg fw-bold"
            href="http://localhost:3000/register"
            type="button"
          >
            Create Account
          </a>
          <button class="btn admin-button-color btn-lg fw-bold" type="button">
            Delete Account
          </button>
          <button
            class="btn admin-button-color btn-lg fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            type="button"
          >
            Lodge Complaint
          </button>
          <button class="btn admin-button-color btn-lg fw-bold" type="button">
            View All Complaints
          </button>
        </div>
      </div>

      <div
        class="modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Select lodger
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <AsyncSelect
                    loadOptions={fetchLodgerData}
                    placeholder={
                      <div style={{ color: "grey" }}>
                        Choose Lodger
                      </div>
                    }
                    onChange={handleLodgerOnChange}
                    components={{
                      DropdownIndicator: () => null, // Remove dropdown icon
                      IndicatorSeparator: () => null, // Remove separator
                    }}
                    onBlur={(e) => {
                      setOpenCompLodgerMenu(false);
                    }}
                    onInputChange={(e, { action }) => {
                      if (e.length === 0) {
                        setOpenCompLodgerMenu(false);
                        return;
                      }
                      if (action === "input-change") {
                        setOpenCompLodgerMenu(true);
                      }
                    }}
                    menuIsOpen={openCompLodgerMenu}
                  />
                  <span class={"text-danger d-" + newLodgerErrorClass}>
                    Select complain lodger.
                  </span>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleLodgeComplainClick}
              >
                Lodge Complain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminHomepage;
