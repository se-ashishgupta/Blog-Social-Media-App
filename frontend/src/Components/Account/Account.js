import React, { useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, loadUser, logoutUser } from "../../Action/userAction";
import Loader from "../Loader/Loader";
import { Avatar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const naviagte = useNavigate();

  const { user, loading: userLoading } = useSelector((state) => state.user);

  const { loading, blogs, error, message } = useSelector(
    (state) => state.myBlogs
  );

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out successfully");
    naviagte("/");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, dispatch, message, alert]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <Typography>Blogs</Typography>
          <Typography>{blogs && blogs.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={loading}
        >
          Delete My Profile
        </Button>
      </div>
    </div>
  );
};

export default Account;
