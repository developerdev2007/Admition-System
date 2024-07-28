import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="py-4 bg-blue-800">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          to="/"
          className="text-2xl font-semibold text-white hover:text-blue-300 hover:underline"
        >
          GBN
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-xl text-white hover:underline hover:text-blue-300"
          >
            Form
          </Link>
          <Link
            to="/report"
            className="text-xl text-white hover:underline hover:text-blue-300"
          >
            Report
          </Link>
          <Link
            to="/userlist"
            className="text-xl text-white hover:underline hover:text-blue-300"
          >
            UserList
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
