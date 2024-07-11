import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="center">
      <h2>Welcome to Credential Manager</h2>
      <div className="homeCTAWrapper">
        <Link to="/add-credential">
          <div className="homeCTA">
            <img src="/assets/add.svg" alt="" />

            <button>Add Credential</button>
          </div>
        </Link>
        <Link to="/view-credentials">
          <div className="homeCTA">
            <img src="/assets/view.svg" alt="" />

            <button>View Credentials</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
