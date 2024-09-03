import React, { useState } from "react";
import calssName from "className";
import css from "../asset/styles/createUser.module.scss";
import { Link } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "src/store/user/userReducer";

import { nanoid } from "nanoid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CreateUser = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showModalErrorFile, setShowModalErrorFile] = useState(false);

  const [newUser, setNewUser] = useState({
    id: nanoid(5),
    firstName: "",
    lastName: "",
    address: "",
    birthDay: "",
    department: "",
    avatar: "",
  });

  const handleClickGoback = () => {
    navigate(-1);
  };

  const handleOnChangeAvatar = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "jpg" || fileExtension === "png") {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setNewUser({ ...newUser, avatar: reader.result });
        };
      } else {
        setShowModalErrorFile(true);
      }
    }
  };

  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    if (
      newUser.firstName === "" ||
      newUser.lastName == "" ||
      newUser.address === "" ||
      newUser.birthDay === "" ||
      newUser.department === ""
    ) {
      setShow(true);
      return;
    } else {
      await dispatch(createUser(newUser));
      setNewUser({
        id: nanoid(5),
        firstName: "",
        lastName: "",
        address: "",
        birthDay: "",
        department: "",
        avatar: null,
      });
    }
    navigate("/userlist");
  };

  return (
    <>
      <div className={css.container}>
        <Link to="" className={css.btn__back} onClick={handleClickGoback}>
          <BsArrowBarLeft className={css.btn__back__icon} /> Back
        </Link>
        <div className={css.cretaUser}>
          <h1 className={css.title}> CREATE USER </h1>
          <div className={css.createUser__item}>
            <label htmlFor="id">ID</label>
            <br></br>
            <input type="text" id="id" name="id" Value={newUser.id} readOnly />
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="firstName">First Name</label>
            <br></br>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="lastName">Last Name</label>
            <br></br>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={handleOnChange}
            />
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="address">Address</label>
            <br></br>
            <input
              type="text"
              id="address"
              name="address"
              value={newUser.address}
              onChange={handleOnChange}
            />
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="birthDay">BirthDay</label>
            <br></br>
            <input
              type="date"
              id="birthDay"
              name="birthDay"
              max={new Date().toISOString().split("T")[0]}
              value={newUser.birthDay}
              onChange={handleOnChange}
            />
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="department">Department</label>
            <br></br>
            <select
              id="department"
              name="department"
              value={newUser.department}
              onChange={handleOnChange}
            >
              <option>Option Change</option>
              <option value="Dev">Dev</option>
              <option value="Sale">Sale</option>
              <option value="HR">HR</option>
              <option value="Test">Test</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className={css.createUser__item}>
            <label htmlFor="avatar">Avatar</label>
            <br></br>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleOnChangeAvatar}
            />
          </div>
          <div
            className={calssName(
              css.createUser__item,
              css.createUser__item__btn
            )}
          >
            <button onClick={handleCreateUser}>Create</button>
            <button>Clear</button>
          </div>
        </div>
      </div>
      <>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Notification:</Modal.Title>
          </Modal.Header>
          <Modal.Body>You need to enter enough information</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShow(false);
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {showModalErrorFile && (
        <Modal show={true}>
          <Modal.Header closeButton>
            <Modal.Title>Notification:</Modal.Title>
          </Modal.Header>
          <Modal.Body>File upload not png & jpg</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowModalErrorFile(false);
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CreateUser;
