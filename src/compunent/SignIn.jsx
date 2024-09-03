import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import className from "className";
import css from "../asset/styles/signIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const SignIn = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ userName: "", passWord: "" });
  const [messageError, setMessageError] = useState({});
  const [LoadingApi, setLoadingApi] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [bodyShowToast, setBodyShowToast] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, [showToast]);

  const hendleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };
  const handleSignIn = async () => {
    let hasError = false;
    let errors = {};

    if (user.userName.trim().length === 0) {
      errors.userNameError = " * Please Enter User Name";
      hasError = true;
    }

    if (user.passWord.trim().length === 0) {
      errors.passWordError = " * Please Enter Password";
      hasError = true;
    }
    setMessageError({
      errors,
    });
    if (!hasError) {
      setLoadingApi(true);

      const response = await fetch(
        "https://recruitment-api.pyt1.stg.jmr.pl/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: user.userName,
            password: user.passWord,
          }),
        }
      );
      const dataUserSignIn = await response.json();
      console.log(dataUserSignIn);
      if (dataUserSignIn.status === "ok") {
        localStorage.setItem("token", "token");
        setBodyShowToast(dataUserSignIn.message);
        setShowToast(true);
        setTimeout(() => {
          window.location.href = "/userList";
        }, 1000);
      } else {
        console.log("khoong thanh cong");
        setBodyShowToast(dataUserSignIn.message);
        setShowToast(true);
      }
    }
    setLoadingApi(false);
  };

  const handleOnFocus = (e) => {
    if (e.target.name === "userName") {
      setMessageError({
        ...messageError,
        errors: {
          ...messageError.errors,
          userNameError: "",
        },
      });
    }
    if (e.target.name === "passWord") {
      setMessageError({
        ...messageError,
        errors: {
          ...messageError.errors,
          passWordError: "",
        },
      });
    }
  };

  return (
    <>
      <div className={css.container__signIn}>
        <div className={css.SignIn}>
          <div className={css.container}>
            <div className={css.fromSignIn}>
              <p className={css.fromSignIn__title}>Sign In</p>
              <div className={css.fromSignIn__item}>
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  placeholder="User Name"
                  onChange={hendleOnChange}
                  onFocus={handleOnFocus}
                />
                <span>{messageError?.errors?.userNameError ?? null}</span>
                <input
                  type="password"
                  name="passWord"
                  value={user.password}
                  placeholder="Password"
                  onChange={hendleOnChange}
                  onFocus={handleOnFocus}
                />
                <span>{messageError?.errors?.passWordError ?? null}</span>
                <button onClick={handleSignIn}>
                  {LoadingApi && <i className="fas fa-spinner fa-spin"></i>}{" "}
                  &nbsp; SignIn
                </button>
                <p>
                  Don't Have An Account?{" "}
                  <Link to={"/sigUp"} className={css.fromSignIn__item__link}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            <div className={css.connectSignIn}>
              <p>
                or Logn In with{" "}
                <a href="/">
                  <BsInstagram className={css.connectSignIn__icon} />
                </a>
                <a href="/">
                  <BsFacebook className={css.connectSignIn__icon} />
                </a>
              </p>
            </div>
          </div>
          <div className={css.backroundSignIn}></div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          show={showToast}
          animation={true}
          bg="warning"
          autohide
          delay={3000}
        >
          <Toast.Header onClick={handleCloseToast}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{bodyShowToast}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default SignIn;
