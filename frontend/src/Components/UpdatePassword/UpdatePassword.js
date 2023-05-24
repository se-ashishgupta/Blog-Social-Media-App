import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../src/Action/userAction";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.myBlogs);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword, newCPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [message, dispatch, alert, error]);
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Change Password
        </Typography>
        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => {
            setoldPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          className="updatePasswordInputs"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New Confirm Password"
          required
          value={newCPassword}
          className="updatePasswordInputs"
          onChange={(e) => {
            setNewCPassword(e.target.value);
          }}
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};
export default UpdatePassword;
