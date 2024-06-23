import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { AlertApi } from "../context/Alert";
import axios from "axios";

let initialValues = {
  RegistrationNo: "",
  candidateName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "",
  gender: "",
  familyId: "",
  boardRollNo: "",
  boardName: "",
  marksObtained: "",
  totalMarks: "",
  percentage: "",
  mathMarks: "",
  physicsMarks: "",
  englishMarks: "",
  aadhaarNo: "",
  address: "",
  studentMobileNo: "",
  parentMobileNo: "",
  prevAdmissionRollNo: "",
  prevTradeAndInstitute: "",
  Section: "",
  remarks: "",
  category: "",
  income: "",
};

let validationSchema = Yup.object({
  candidateName: Yup.string().required("Candidate Name  is required"),
  RegistrationNo: Yup.number().required("RegistrationNo   is required"),
  fatherName: Yup.string().required("fatherName Name  is required"),
  motherName: Yup.string().required("motherName Name  is required"),
  dateOfBirth: Yup.string().required("dateOfBirth Name  is required"),
  familyId: Yup.string().required("familyId Name  is required"),
  category: Yup.string().required("category Name  is required"),
  boardRollNo: Yup.number().required("boardRollNo Name  is required"),
  boardName: Yup.string().required("boardName Name  is required"),
  marksObtained: Yup.number().required("marksObtained Name  is required"),
  totalMarks: Yup.number().required("totalMarks Name  is required"),
  aadhaarNo: Yup.string().required("aadhaarNo Name  is required"),
  address: Yup.string().required("address Name  is required"),
  studentMobileNo: Yup.number()
    .required("Student Mobile Number is required")
    .min(1000000000, "Mobile Number must be at least 10 digits")
    .typeError("Invalid Mobile Number"),

  parentMobileNo: Yup.number()
    .required("Parent Mobile Number is required")
    .min(1000000000, "Mobile Number must be at least 10 digits")
    .typeError("Invalid Mobile Number"),
  gender: Yup.string().required("gender must be selected"),
});

const categoryOptions = [
  "AIC",
  "GENERAL",
  "SC/SCD",
  "BCA/BCB",
  "TFW",
  "EWS",
  "PM Care",
  "HARIHAR",
  "OTHER",
];
const LateralSection = ["10+2 with PCM/PCB", "ITI 2yrs/NSQF level4"];

const FormExample = () => {
  const { _id } = useParams();
  const { setAlert } = AlertApi();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.category === "BCA/BCB" || values.category === "TFW") {
      if (!values.income) {
        setAlert({ type: "warning", message: "Income is required for TFW/BC" });
        return;
      }
    }
    setSubmitting(true);
    if (_id === "Diploma Engg") {
      if (!values.mathMarks || !values.englishMarks || !values.physicsMarks) {
        setAlert({ type: "warning", message: "Subject marks required " });

        return;
      }
    } else if (_id === "Diploma Engg Lateral Entry") {
      if (!values.Section) {
        setAlert({
          type: "warning",
          message: "Additional subject required for  Lateral Entry",
        });

        return;
      }
    }

    //  url

    const {
      candidateName,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      familyId,
      category,
      boardRollNo,
      boardName,
      marksObtained,
      totalMarks,
      mathMarks,
      physicsMarks,
      englishMarks,
      aadhaarNo,
      address,
      studentMobileNo,
      parentMobileNo,
      prevAdmissionRollNo,
      prevTradeAndInstitute,
      Section,
      income,
      remarks,
      RegistrationNo,
    } = values;

    const url = "http://localhost:8000/newUser";

    const playload = {
      Course: _id,
      Qualification: Section,
      Name: candidateName,
      FatherName: fatherName,
      MotherName: motherName,
      DOB: dateOfBirth,
      Gender: gender,
      FamilyId: familyId,
      Category: category,
      BoardRollNo: boardRollNo,
      BoardName: boardName,
      MarksObtained: marksObtained,
      TotalMarks: totalMarks,
      Percentage: parseFloat(
        `${
          marksObtained && totalMarks
            ? ((marksObtained / totalMarks) * 100).toFixed(4)
            : ""
        }`
      ),
      Math: parseInt(mathMarks),
      Physics: parseInt(physicsMarks),
      English: parseInt(englishMarks),
      AadhaarNo: aadhaarNo,
      Address: address,
      StudentMobileNo: studentMobileNo,
      ParentsMobileNo: parentMobileNo,
      PreviousAdmissionNo: prevAdmissionRollNo,
      PreviousTrade: prevTradeAndInstitute,
      Income: income,
      Remarks: remarks,
      RegistrationNo: RegistrationNo,
    };

    try {
      await axios.post(url, playload);
      setAlert({
        type: "success",
        message: "User Submit",
      });
      resetForm();
      navigate("/");
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: "Somthing Went Wrong",
      });
    }

    setSubmitting(false);
  };
  useEffect(() => {
    if (_id !== "Diploma Engg" && _id !== "Diploma Engg Lateral Entry") {
      navigate(`/`);
    }
  }, [_id]);
  // eslint-disable-next-line

  return (
    <div className="min-h-screen  p-6 flex items-center justify-center  bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-  max-w-4xl">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">{_id}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="RegistrationNo"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Registration No
                </label>
                <Field
                  type="number"
                  id="RegistrationNo"
                  name="RegistrationNo"
                  className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                />
                <ErrorMessage
                  name="RegistrationNo"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="candidateName"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Candidate Name
                  </label>
                  <Field
                    type="text"
                    id="candidateName"
                    name="candidateName"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="candidateName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="fatherName"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Father's Name
                  </label>
                  <Field
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="fatherName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="motherName"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Mother's Name
                  </label>
                  <Field
                    type="text"
                    id="motherName"
                    name="motherName"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="motherName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <Field
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              {/*  lateral  */}
              {_id === "Diploma Engg Lateral Entry" ? (
                <div className="flex flex-col">
                  <label
                    htmlFor="Section"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Qualification
                  </label>
                  <Field
                    as="select"
                    id="Section"
                    name="Section"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  >
                    <option value="">Qualification</option>
                    {LateralSection.map((lateralSection) => (
                      <option key={lateralSection} value={lateralSection}>
                        {lateralSection}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="Section"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="familyId"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Family ID
                  </label>
                  <Field
                    type="text"
                    id="familyId"
                    name="familyId"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="familyId"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                    onChange={(e) => {
                      handleCategoryChange(e);
                      handleChange(e);
                    }}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="income"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Income
                  </label>
                  <Field
                    type="number"
                    id="income"
                    name="income"
                    className={`p-2 border rounded-md ${
                      ["TFW", "BCA/BCB"].includes(category) ? "" : "bg-red-200"
                    } border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
                    disabled={!["TFW", "BCA/BCB"].includes(category)}
                  />
                  <ErrorMessage
                    name="income"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="boardRollNo"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Board Roll No
                  </label>
                  <Field
                    type="number"
                    id="boardRollNo"
                    name="boardRollNo"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="boardRollNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="boardName"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Board Name
                  </label>
                  <Field
                    type="text"
                    id="boardName"
                    name="boardName"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="boardName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="marksObtained"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Marks Obtained
                  </label>
                  <Field
                    type="number"
                    id="marksObtained"
                    name="marksObtained"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="marksObtained"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="totalMarks"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Marks
                  </label>
                  <Field
                    type="number"
                    id="totalMarks"
                    name="totalMarks"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="totalMarks"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="percentage"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Percentage
                  </label>
                  <Field
                    type="number"
                    id="percentage"
                    name="percentage"
                    readOnly
                    value={
                      values.marksObtained && values.totalMarks
                        ? (
                            (values.marksObtained / values.totalMarks) *
                            100
                          ).toFixed(4)
                        : ""
                    }
                    className="p-2 border rounded-md bg-green-100"
                  />
                </div>
              </div>

              {_id === "Diploma Engg" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="mathMarks"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Math Marks
                    </label>
                    <Field
                      type="number"
                      id="mathMarks"
                      name="mathMarks"
                      className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                    />
                    <ErrorMessage
                      name="mathMarks"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="physicsMarks"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Science Marks
                    </label>
                    <Field
                      type="number"
                      id="physicsMarks"
                      name="physicsMarks"
                      className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                    />
                    <ErrorMessage
                      name="physicsMarks"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="englishMarks"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      English Marks
                    </label>
                    <Field
                      type="number"
                      id="englishMarks"
                      name="englishMarks"
                      className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                    />
                    <ErrorMessage
                      name="englishMarks"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="aadhaarNo"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Aadhaar No
                  </label>
                  <Field
                    type="text"
                    id="aadhaarNo"
                    name="aadhaarNo"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="aadhaarNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="studentMobileNo"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Student Mobile No
                  </label>
                  <Field
                    type="number"
                    id="studentMobileNo"
                    name="studentMobileNo"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="studentMobileNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="parentMobileNo"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Parent Mobile No
                  </label>
                  <Field
                    type="number"
                    id="parentMobileNo"
                    name="parentMobileNo"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                  <ErrorMessage
                    name="parentMobileNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="prevAdmissionRollNo"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Previous Admission Roll No (optional)
                  </label>
                  <Field
                    type="number"
                    id="prevAdmissionRollNo"
                    name="prevAdmissionRollNo"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="prevTradeAndInstitute"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Previous Trade and Institute (optional)
                  </label>
                  <Field
                    type="text"
                    id="prevTradeAndInstitute"
                    name="prevTradeAndInstitute"
                    className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="remarks"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Remarks (optional)
                </label>
                <Field
                  type="text"
                  id="remarks"
                  name="remarks"
                  className="p-2 border rounded-md border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Plz wait ........" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormExample;
