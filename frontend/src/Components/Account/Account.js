import React, { useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyProfile,
  getMyBlogs,
  logoutUser,
} from "../../Action/userAction";
import Loader from "../Loader/Loader";
import { Avatar, Button, Typography } from "@mui/material";
import Blog from "../Blog/Blog";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);

  const { loading, blogs, error, message } = useSelector(
    (state) => state.myBlogs
  );

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getMyBlogs());
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
      <div className="accountleft">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              blogId={blog._id}
              caption={blog.caption}
              blogImage={blog.image.url}
              likes={blog.likes}
              comments={blog.comments}
              ownerImage={blog.owner.avatar.url}
              ownerName={blog.owner.name}
              ownerId={blog.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6"> No Blogs Yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <Typography>Blogs</Typography>
          <Typography></Typography>
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
