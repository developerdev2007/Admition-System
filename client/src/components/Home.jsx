import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const CheckboxApp = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    // Perform your submit logic here
    console.log(`Selected Option: ${selectedOption}`);
    navigate(`/form/${selectedOption}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-20 flex mt-10 justify-center ">
        <div className="checkbox-container rounded-md bg-blue-200 p-12 space-y-4 shadow-lg">
          <div
            className={`checkbox-option flex items-center p-3 rounded-md cursor-pointer transition ${
              selectedOption === "Diploma Engg Lateral Entry"
                ? "bg-green-500"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleOptionChange("Diploma Engg Lateral Entry")}
          >
            <div
              className={`checkmark p-1 rounded-full ${
                selectedOption === "Diploma Engg Lateral Entry"
                  ? "bg-white"
                  : "bg-gray-200"
              }`}
            >
              {selectedOption === "Diploma Engg Lateral Entry" && (
                <svg
                  className="w-4 h-4 text-green-500"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.10999 9.14583L5.47999 11.0833L12.38 4.04167"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <label className="ml-3 text-gray-700">
              Diploma Engg Lateral Entry
            </label>
          </div>
          <div
            className={`checkbox-option flex items-center p-3 rounded-md cursor-pointer transition ${
              selectedOption === "Diploma Engg"
                ? "bg-green-500"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleOptionChange("Diploma Engg")}
          >
            <div
              className={`checkmark p-1 rounded-full ${
                selectedOption === "Diploma Engg" ? "bg-white" : "bg-gray-200"
              }`}
            >
              {selectedOption === "Diploma Engg" && (
                <svg
                  className="w-4 h-4 text-green-500"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.10999 9.14583L5.47999 11.0833L12.38 4.04167"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <label className="ml-3 text-gray-700">Diploma Engg</label>
          </div>
          <button
            onClick={handleSubmit}
            className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-opacity ${
              selectedOption ? "opacity-100" : "opacity-50 pointer-events-none"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckboxApp;
