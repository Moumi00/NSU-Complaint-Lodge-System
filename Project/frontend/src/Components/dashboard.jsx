import React, { useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("userUNID");

  if (!token) {
    window.location.replace("http://localhost:3000");
  }

  const handleLogOutButton = () => {
      localStorage.clear();
      window.location.replace("http://localhost:3000");
  };
  return (
    <div class="flex-grow-1">
      <h1>Dashboard</h1>
      <button
        className="btn btn-lg btn-outline-success my-2 ms-4 ms-lg-0 me-5"
        onClick={handleLogOutButton}
      >
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
