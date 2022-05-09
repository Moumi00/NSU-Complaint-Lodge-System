import React, { useState } from "react";

function AdminHomepage() {
  return (
    <div class="flex-grow-1">
      <div className="row">
        <div class="d-grid gap-4 col-4 mx-auto">
          <a class="btn admin-button-color btn-lg fw-bold" href="http://localhost:3000/register" type="button">
            Create Account
          </a>
          <button class="btn admin-button-color btn-lg fw-bold" type="button">
            Delete Account
          </button>
          <a class="btn admin-button-color btn-lg fw-bold" href="http://localhost:3000/admin-lodge-complaint" type="button">
            Lodge Complaint
          </a>
          <button class="btn admin-button-color btn-lg fw-bold" type="button">
            View All Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdminHomepage;
