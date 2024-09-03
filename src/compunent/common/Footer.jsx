import React from "react";
import className from "className";
import css from "../../asset/styles/footer.module.scss";
import logo from "../../asset/img/logo.png";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const onLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div className={css.footer}>
      <div className={css.footer__left}>
        <div className={css.footer__left__logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <p className={css.footer__left__desc}>
          Cras incident lobotids feudist makes viramas sagittas eu valuta.
        </p>
        <div className={css.footer__left__contact}>
          <ul className={css.footer__left__contact__item}>
            <li>
              <a href="/">
                <BsFacebook className={css.icon} />
              </a>
            </li>
            <li>
              <a href="/">
                <BsInstagram className={css.icon} />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTwitter className={css.icon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.footer__right}>
        <h1 className={css.footer__right__title}>RESOURCES</h1>
        <div className={css.footer__right__menu}>
          <ul className={css.footer__right__menu__item}>
            <li>
              <Link to="/" className={css.footer__right__menu__link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/userlist" className={css.footer__right__menu__link}>
                User List
              </Link>
            </li>
            <li>
              {localStorage.getItem("token") ? (
                <div onClick={onLogout} className={css.link}>
                  LogOut
                </div>
              ) : (
                <div onClick={onLogin} className={css.link}>
                  LogIn
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={css.footer_copyright}>
        <p>Copyright © RESTINA 2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
