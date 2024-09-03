import React from "react";
import className from "className";
import css from "../../asset/styles/header.module.scss";
import logo from "../../asset/img/logo.png";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
const Header = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const onLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div>
      <div className={className(css.header)}>
        <div className={css.header__logo}>
          <Link to="/">
            <img
              className={className(css.header__logoImg)}
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className={className(css.header__menu)}>
          <ul className={className(css.header__menulist)}>
            <li
              className={className(
                css.header__menuItem,
                css.header__menuUserList
              )}
            >
              <Link
                to="/userlist"
                className={className(css.link, css.link__userlist)}
              >
                USER LIST
              </Link>
              <AiOutlinePlus className={className(css.icon)} />
            </li>
            <li className={className(css.header__menuItem)}>
              {localStorage.getItem("token") ? (
                <div onClick={onLogout} className={className(css.link)}>
                  LogOut
                </div>
              ) : (
                <div onClick={onLogin} className={className(css.link)}>
                  LogIn
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
