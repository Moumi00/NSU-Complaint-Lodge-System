import React, { useState } from "react";

function ComplainRow() {

    return (
        <>
            <div class="card border border-4 rounded-3 border-dark m-2">
                <div class="card-body">
                    <h3 class="card-title">Complain Title</h3>
                    <h5 class="card-text mt-4 mb-3 text-danger">Latest Comment: Upload Clear Photo</h5>
                    <div className="d-flex justify-content-between">
                        <h5 class="card-text">Complain Status: Open</h5>
                        <div>
                            <a href="#" class="btn btn-primary me-2">Check details</a>
                            <a href="#" class="btn btn-primary">Edit Complain</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComplainRow;
