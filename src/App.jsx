import React from "react";
import Layout from "./compunent/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Userlist from "./compunent/Userlist";
import UserDetail from "./compunent/UserDetail";
import EditUser from "./compunent/EditUser";
import CreateUser from "./compunent/CreateUser";
import SignIn from "./compunent/SignIn";
import SignUp from "./compunent/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        {localStorage.getItem("token") ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="userList" element={<Userlist />}></Route>
              <Route
                path="userList/details/:id"
                element={<UserDetail></UserDetail>}
              />
              <Route
                path="userList/edituser/:id"
                element={<EditUser></EditUser>}
              />
              <Route path="userList/createUser" element={<CreateUser />} />
            </Route>
            <Route path="*" element={<Layout />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Layout />} />
            <Route path="logIn" element={<SignIn />} />
            <Route path="sigUp" element={<SignUp />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
