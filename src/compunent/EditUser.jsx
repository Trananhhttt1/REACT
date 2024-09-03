import React, { useEffect, useState } from "react";
import calssName from "className";
import css from "../asset/styles/editUser.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  userByIdEdit,
  getUserByIdEdit,
} from "src/store/user/userReducer";
const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const dataUserEdit = useSelector((state) => state.user.userByIdEdit);

  const [userEdit, setUserEdit] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthDay: "",
    department: "",
    avatar: "",
  });

  useEffect(() => {
    if (dataUserEdit) {
      setUserEdit(dataUserEdit);
    }
  }, [dataUserEdit]);

  useEffect(() => {
    dispatch(getUserByIdEdit(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserEdit({ ...userEdit, avatar: reader.result });
    };
  };

  const handleUpdate = () => {
    console.log(userEdit);
    dispatch(editUser(userEdit));
    navigate("/userlist");
  };

  const handleClickGoback = () => {
    navigate("/");
  };
  return (
    <div className={css.container}>
      <Link
        to="/userlist"
        className={css.btn__back}
        onClick={handleClickGoback}
      >
        <BsArrowBarLeft className={css.btn__back__icon} /> Back
      </Link>
      <div className={css.EditUser}>
        <h1 className={css.title}> EDIT USER </h1>

        <div className={css.EditUser__item}>
          <label htmlFor="firstName">First Name</label>
          <br></br>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userEdit.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.EditUser__item}>
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userEdit.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.EditUser__item}>
          <label htmlFor="address">Address</label>
          <br></br>
          <input
            type="text"
            id="address"
            name="address"
            value={userEdit.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.EditUser__item}>
          <label htmlFor="birthDay">BirthDay</label>
          <br></br>
          <input
            type="date"
            id="birthDay"
            name="birthDay"
            value={userEdit.birthDay}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.EditUser__item}>
          <label htmlFor="department">Department</label>
          <br></br>
          <select
            id="department"
            name="department"
            value={userEdit.department}
            onChange={handleInputChange}
          >
            <option>Option Change</option>
            <option value="Dev">Dev</option>
            <option value="Sale">Sale</option>
            <option value="HR">HR</option>
            <option value="Test">Test</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className={css.EditUser__item}>
          <label htmlFor="avatar">Avatar</label>
          <br></br>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
          />
        </div>
        <div className={calssName(css.EditUser__item, css.EditUser__item__btn)}>
          <button onClick={handleUpdate}>UpDate</button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
