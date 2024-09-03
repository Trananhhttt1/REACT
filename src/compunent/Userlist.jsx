import React, { useEffect, useState } from "react";
import className from "className";
import css from "../asset/styles/userlist.module.scss";
import { Link, Outlet, useResolvedPath } from "react-router-dom";
import { BsTools } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "src/store/user/userReducer";
import { BsSearch } from "react-icons/bs";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { v4 as uuidv4 } from "uuid";

const Userlist = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [idUserDelete, setIdUserDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [toasts, setToasts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const dataUserList = useSelector((state) => {
    return state.user.userList.filter((user) => {
      return user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(idUserDelete));
    const newToast = {
      id: uuidv4(),
      message: "Success",
      show: true,
    };
    setToasts([...toasts, newToast]);
    await dispatch(getUserList());
    setModalShow(false);
    setToasts([...toasts, newToast]);
  };

  const handleDeleteConform = (id) => {
    setModalShow(true);
    setIdUserDelete(id);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.btn__create}>
          <Link to="/userList/createUser" className={css.link}>
            CREATE NEW USER
          </Link>
        </div>
        <div className={css.search}>
          <label htmlFor="search">
            <BsSearch className={css.search__icon} />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Input search text name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={css.searchInput}
          />
        </div>

        <table>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Birthday</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
          {dataUserList.map((user) => {
            return (
              <tr
                style={{
                  color: user?.department === "Dev" ? "red" : "black",
                }}
                key={user.id}
              >
                <td>{user?.id}</td>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.address}</td>
                <td>{user?.birthDay}</td>
                <td>{user?.department}</td>
                <td>
                  <div className={css.group__btn}>
                    <Link to={`/userList/edituser/${user.id}`}>
                      <button className={className(css.btn, css.btn__edit)}>
                        <BsTools className={css.icon} />
                        Edit
                      </button>
                    </Link>
                    <button
                      className={className(css.btn, css.btn__delete)}
                      onClick={() => {
                        handleDeleteConform(user.id);
                      }}
                    >
                      <BsFillTrash3Fill className={css.icon} />
                      Delete
                    </button>
                    <Link to={`/userList/details/${user.id}`}>
                      <button className={className(css.btn, css.btn__detail)}>
                        <AiFillEye className={css.icon} />
                        Details
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {/* modal */}
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user ?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleDeleteUser();
            }}
          >
            Delete
          </Button>
          <Button
            className="bg-transparent text-black boder-black boder-opacity-25"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            show={toast.show}
            bg="warning"
            autohide
            delay={3000}
            onClose={() => setToasts([])}
          >
            <Toast.Header>
              <strong className="me-auto">Delete</strong>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};

export default Userlist;
