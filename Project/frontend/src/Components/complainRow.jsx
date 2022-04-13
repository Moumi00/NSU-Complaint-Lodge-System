import React, { useState, useEffect } from "react";

function ComplainRow(props) {

    useEffect(() => {
        async function fetchData() {
            console.log(props.complain)
        }
        fetchData();
      }, []);

    return (
        <>
            <div className="row">
                <div class="card border border-4 background-color rounded-3 border-white m-2 card-shadow" >
                    <div class="card-body">
                        <h3 class="card-title">{props.complain.complainTitle}</h3>
                        <h5 class="card-text mt-4 mb-3 text-danger">Latest Comment: Upload Clear Photo</h5>
                        <div className="d-flex justify-content-between">
                            <h5 class="card-text">Complain Status: {props.complain.status}</h5>
                            <div>
                                <a href="#" class="btn btn-primary me-2">Check details</a>
                                <a href="#" class="btn btn-primary">Edit Complain</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComplainRow;
