import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import Userlist from "./Userlist";
import css from "../asset/styles/layout.module.scss";
import UserDetail from "./UserDetail";
import CreateUser from "./CreateUser";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
const Layout = () => {
  return (
    <div className={css.container}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
