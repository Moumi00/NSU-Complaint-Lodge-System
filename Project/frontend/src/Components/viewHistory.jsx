import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AsyncSelect from "react-select/async";

function ViewHistory() {
  const [complainUNID, setComplainUNID] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("userUNID");
  const [complainVersion, setComplainVersion] = useState("");
  const [complainDescription, setComplainDescription] = useState("");
  const [complainAgainst, setComplainAgainst] = useState([]);
  const [lodgerName, setLodgerName] = useState("");
  const [lodgerNsuId, setLodgerNsuId] = useState("");
  const [lodgerEmail, setLodgerEmail] = useState("");
  const [lodgerUserUNID, setLodgerUserUNID] = useState("");
  const [lodgerDesignation, setLodgerDesignation] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentErrorClass, setCommentErrorClass] = useState("none");
  const [isReviewer, setIsReviewer] = useState("");
  const [openCompReviewerMenu, setOpenCompReviewerMenu] = useState(false);

  const [newReviewer, setNewReviewer] = useState("");
  const [newReviewerErrorClass, setNewReviewerErrorClass] = useState("none");

  useEffect(() => {
    async function fetchData() {
    }
    fetchData();
  }, []);

  

  return (
    <div class="flex-grow-1 background-color d-flex">
      <div className="container-fluid ms-5">
        <div className="row">
          <div class="col-7 my-4 ms-2">
            <div className="row">
              <div className="col-7">
                <h2 className="my-3 d-block">Edit History</h2>
              </div>
              <div className="col-5">
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Version</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <h5>1</h5>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Description</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <h5>{complainDescription}</h5>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Complain Against</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                {complainAgainst.length != 0 ? (
                  complainAgainst.map((e) => <h5>{e.fullName}</h5>)
                ) : (
                  <h1></h1>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className="h5">Evidence(s)</div>
                  <div className="h5">:</div>
                </div>
              </div>
              <div className="col-9">
                <div className="d-flex flex-column">
                  {evidence.map((src, index) => (
                    <div className="mb-2">
                      <a
                        className="h5"
                        href={"http://localhost:8000/uploads/Evidence/" + src}
                        target="_blank"
                        download={index + 1}
                      >
                        Evidence {index + 1}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
           
           
          </div>
          
        </div>
      </div>

      
    </div>
  );
}

export default ViewHistory;
