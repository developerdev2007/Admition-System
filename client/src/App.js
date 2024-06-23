import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavigationBar from "./components/Navbar";
import Report from "./components/Report";
import FormExample from "./components/Form";
import "./app.css";
import UserList from "./components/UserList";
import UpdateAndDeleteForm from "./components/UpdateAndDeleteForm";
function App() {
  return (
    <>
      <Router>
        <div className="">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form/:_id" element={<FormExample />} />
            <Route path="/report" element={<Report />} />
            <Route path="/userlist" element={<UserList />} />
            <Route
              path="//user/update/:_id/:uuid"
              element={<UpdateAndDeleteForm />}
            />

            {/* Admin */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
