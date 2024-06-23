import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the user schema
const UserSchema = new Schema({
  Rank: {
    type: String,
    default: null,
  },
  Course: {
    type: String,
    required: true,
  },
  RegistrationNo: {
    type: Number,
    required: true,
  },
  Qualification: {
    type: String,
  },
  Name: {
    type: String,
    required: true,
  },
  FatherName: {
    type: String,
  },
  MotherName: {
    type: String,
  },
  DOB: {
    type: String,
  },
  Gender: {
    type: String,
  },
  FamilyId: {
    type: String,
  },
  Category: {
    type: String,
  },

  Income: {
    type: String,
  },
  BoardRollNo: {
    type: String,
  },
  BoardName: {
    type: String,
  },
  MarksObtained: {
    type: Number,
  },
  TotalMarks: {
    type: Number,
  },
  Percentage: {
    type: Number,
  },
  Math: {
    type: Number,
  },
  Physics: {
    type: Number,
  },
  English: {
    type: Number,
  },
  AadhaarNo: {
    type: String,
    unique: true,
  },
  Address: {
    type: String,
  },
  StudentMobileNo: {
    type: String,
  },
  ParentsMobileNo: {
    type: String,
  },
  PreviousAdmissionNo: {
    type: String,
    default: null,
  },
  PreviousTrade: {
    type: String,
    default: null,
  },
  Remarks: {
    type: String,
    default: null,
  },
});

// Create the user model

export const User = mongoose.model("User", UserSchema);
