import React, { useState } from "react";
import className from "className";
import css from "../asset/styles/signUp.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createUserClient } from "src/store/user/userReducer";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const SignUp = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [bodyShowToast, setBodyShowToast] = useState("");
  const [LoadingApi, setLoadingApi] = useState(false);
  const [user, setUser] = useState({
    Email: "",
    UserName: "",
    Date: "",
    PassWord: "",
  });
  const [messageError, setMessageError] = useState({});
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /[A-Za-z\d@$!%*?&]{8,}/;

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const onClickSignUp = async () => {
    let errors = {};
    let hasError = false;

    if (user.Email.trim().length === 0) {
      errors.EmailError = "* Please Enter Email";
      hasError = true;
    } else {
      if (!emailRegex.test(user.Email)) {
        errors.EmailError = "* Nhap khong dung dang Email";
        hasError = true;
      }
    }
    if (user.UserName.trim().length === 0) {
      errors.UserNameError = "* Please Enter UserName";
      hasError = true;
    }
    if (user.Date.trim().length === 0) {
      errors.DateError = "* Please Enter Date";
      hasError = true;
    } else {
      let age = calculateAge(user.Date);
      console.log("age", age);
      if (age < 18) {
        errors.DateError = "* Bạn phải lớn hơn 18 tuổi";
        hasError = true;
      }
    }
    if (user.PassWord.trim().length === 0) {
      errors.PassWordError = "* Please Enter PassWord";
      hasError = true;
    } else {
      if (!passwordRegex.test(user.PassWord)) {
        errors.PassWordError =
          "* 8 ký tự:  chữ cái viết hoa, viết thường, số, và ký tự đặc biệt";
        hasError = true;
      }
    }

    setMessageError({ errors });
    if (!hasError) {
      setLoadingApi(true);
      await dispatch(createUserClient(user));
      setLoadingApi(false);
      setBodyShowToast("Đăng ký thành công");
      setShowToast(true);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  const handleCloseToast = () => {};

  return (
    <>
      <div className={css.container__signIn}>
        <div className={css.SignUp}>
          <div className={css.container}>
            <div className={css.fromSignUp}>
              <p className={css.fromSignUp__title}>Sign Up</p>
              <div className={css.fromSignUp__item}>
                <input
                  type="text"
                  name="Email"
                  id=""
                  placeholder="Email "
                  onChange={handleOnChange}
                />
                <span>{messageError?.errors?.EmailError ?? null}</span>
                <input
                  type="text"
                  name="UserName"
                  id=""
                  placeholder="User Name"
                  onChange={handleOnChange}
                />
                <span>{messageError?.errors?.UserNameError ?? null}</span>
                <input
                  type="date"
                  name="Date"
                  placeholder="Date of Birth"
                  onChange={handleOnChange}
                />
                <span>{messageError?.errors?.DateError ?? null}</span>
                <input
                  type="password"
                  name="PassWord"
                  placeholder="Password"
                  onChange={handleOnChange}
                />
                <span>{messageError?.errors?.PassWordError ?? null}</span>
                <button onClick={onClickSignUp}>
                  {LoadingApi && <i className="fas fa-spinner fa-spin"></i>}{" "}
                  &nbsp;SignUp
                </button>
                <p>
                  Already have an account?{" "}
                  <Link to={"/logIn"} className={css.fromSignUp__item__link}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
            <div className={css.connectSignUp}>
              <p>
                or connect with{" "}
                <a href="/">
                  <BsInstagram className={css.connectSignUp__icon} />
                </a>
                <a href="/">
                  <BsFacebook className={css.connectSignUp__icon} />
                </a>
              </p>
            </div>
          </div>
          <div className={css.backroundSignUp}></div>
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

export default SignUp;
