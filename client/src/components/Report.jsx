import axios from "axios";
import React, { useState } from "react";
import { AlertApi } from "../context/Alert";

const CheckboxApp = () => {
  const [Loadder, setLoadder] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Diploma Engg");
  const [selectedCategories, setSelectedCategories] = useState({
    AIC: 0,
    GENERAL: 0,
    GENERAL_EWS: 0,
    GENERAL_TFW: 0,
    GENERAL_EWS_TFW: 0,
    SC_SCD: 0,
    BCA_BCB: 0,
    SC_SCD_TFW: 0,
    BCA_BCB_TFW: 0,
    TFW: 0,
    EWS: 0,
    PM_Care: 0,
    HARIHAR: 0,
    OTHER: 0,
  });

  const { setAlert } = AlertApi();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories({
      ...selectedCategories,
      [category]: selectedCategories[category] === 0 ? 1 : 0,
    });
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedCategories).every(
      (value) => value === 1
    );
    const updatedCategories = {};
    for (const category in selectedCategories) {
      updatedCategories[category] = allSelected ? 0 : 1;
    }
    setSelectedCategories(updatedCategories);
  };

  const HandleSubmit = async () => {
    setLoadder(true);
    const {
      AIC,
      GENERAL,
      GENERAL_EWS,
      GENERAL_TFW,
      GENERAL_EWS_TFW,
      SC_SCD,
      BCA_BCB,
      SC_SCD_TFW,
      BCA_BCB_TFW,
      TFW,
      EWS,
      PM_Care,
      HARIHAR,
      OTHER,
    } = selectedCategories;

    const DET = parseInt(
      `${selectedOption === "Diploma Engg Lateral Entry" ? 1 : 0}`
    );
    const DAT = parseInt(`${selectedOption === "Diploma Engg" ? 1 : 0}`);

    const url = "http://localhost:8000/Report";

    const playload = {
      DET,
      DAT,
      AIC,
      GENERAL,
      GENERAL_EWS,
      GENERAL_TFW,
      GENERAL_EWS_TFW,
      SC_SCD,
      BCA_BCB,
      SC_SCD_TFW,
      BCA_BCB_TFW,
      TFW,
      EWS,
      PM_Care,
      HARIHAR,
      OTHER,
    };
    try {
      await axios.post(url, playload);
      setAlert({
        type: "success",
        message: "Report Genrated at /doc",
      });
      setSelectedCategories({
        AIC: 0,
        GENERAL: 0,
        GENERAL_EWS: 0,
        GENERAL_TFW: 0,
        GENERAL_EWS_TFW: 0,
        SC_SCD: 0,
        BCA_BCB: 0,
        SC_SCD_TFW: 0,
        BCA_BCB_TFW: 0,
        TFW: 0,
        EWS: 0,
        PM_Care: 0,
        HARIHAR: 0,
        OTHER: 0,
      });
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: "Somthing Went Wrong",
      });
    }
    setLoadder(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-md sm:max-w-md">
        <div className="p-6 mb-6 rounded-lg bg-cartoon">
          <h1 className="mb-4 text-xl font-semibold">Generate Report</h1>
          <div className="grid gap-4">
            <div className="mb-4">
              <label className="block text-sm text-gray-700">
                Select an option:
              </label>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center p-2 rounded-lg border ${
                    selectedOption === "Diploma Engg Lateral Entry"
                      ? "border-green-500 bg-green-100"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    id="lateralEntry"
                    name="option"
                    value="Diploma Engg Lateral Entry"
                    checked={selectedOption === "Diploma Engg Lateral Entry"}
                    onChange={() =>
                      handleOptionChange("Diploma Engg Lateral Entry")
                    }
                    className="w-4 h-4 text-green-500 border-gray-300 rounded-full focus:ring-green-500"
                  />
                  <label
                    htmlFor="lateralEntry"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Lateral Entry
                  </label>
                </div>
                <div
                  className={`flex items-center p-2 rounded-lg border ${
                    selectedOption === "Diploma Engg"
                      ? "border-green-500 bg-green-100"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    id="diplomaEngg"
                    name="option"
                    value="Diploma Engg"
                    checked={selectedOption === "Diploma Engg"}
                    onChange={() => handleOptionChange("Diploma Engg")}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded-full focus:ring-green-500"
                  />
                  <label
                    htmlFor="diplomaEngg"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Diploma Engg
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(selectedCategories).map((category) => (
                <div className="flex items-center" key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    name={category}
                    checked={selectedCategories[category] === 1}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label
                    htmlFor={category}
                    className="block ml-2 text-sm text-gray-900"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                name="selectAll"
                checked={Object.values(selectedCategories).every(
                  (value) => value === 1
                )}
                onChange={handleSelectAll}
                className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="selectAll"
                className="block ml-2 text-sm text-gray-900"
              >
                Select All
              </label>
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-lg focus:outline-none"
                onClick={HandleSubmit}
                disabled={Loadder}
              >
                {Loadder ? "Plz Wait" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxApp;
