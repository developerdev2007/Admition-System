import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="bg-blue-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">
          GBN
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300">
            Form
          </Link>
          <Link to="/report" className="text-white hover:text-blue-300">
            Report
          </Link>
          <Link to="/userlist" className="text-white hover:text-blue-300">
            UserList
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
