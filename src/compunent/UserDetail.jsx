import React, { useEffect } from "react";
import calssName from "className";
import css from "../asset/styles/userdetail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdDetail } from "src/store/user/userReducer";
const UserDetail = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUserListDetails = useSelector(
    (state) => state.user.userByIdDetails
  );

  useEffect(() => {
    dispatch(getUserByIdDetail(id));
  }, [dispatch, id]);

  const handleClickGoback = () => {
    navigate(-1);
  };
  return (
    <div className={css.details}>
      <div className={css.details__avt}>
        <img src={dataUserListDetails.avatar} alt="" />
      </div>
      <div className={css.container}>
        <Link to="" className={css.btn__back} onClick={handleClickGoback}>
          <BsArrowBarLeft className={css.btn__back__icon} /> Back
        </Link>
        <div className={css.uerDetail}>
          <h1 className={css.title}> USER DETAILS </h1>
          <div className={css.userDetail__item}>
            <label htmlFor="id">ID</label>
            <br></br>
            <input type="text" id="id" value={dataUserListDetails.id} />
          </div>
          <div className={css.userDetail__item}>
            <label htmlFor="firstName">First Name</label>
            <br></br>
            <input
              type="text"
              id="firstName"
              value={dataUserListDetails.firstName}
            />
          </div>
          <div className={css.userDetail__item}>
            <label htmlFor="lastName">Last Name</label>
            <br></br>
            <input
              type="text"
              id="lastName"
              value={dataUserListDetails.lastName}
            />
          </div>
          <div className={css.userDetail__item}>
            <label htmlFor="address">Address</label>
            <br></br>
            <input
              type="text"
              id="address"
              value={dataUserListDetails.address}
            />
          </div>
          <div className={css.userDetail__item}>
            <label htmlFor="birthDay">BirthDay</label>
            <br></br>
            <input
              type="text"
              id="birthDay"
              value={dataUserListDetails.birthDay}
            />
          </div>
          <div className={css.userDetail__item}>
            <label htmlFor="department">Department</label>
            <br></br>
            <input
              type="text"
              id="department"
              value={dataUserListDetails.department}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
