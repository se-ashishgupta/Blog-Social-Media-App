import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../src/Action/userAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading } = useSelector((state) => state.user);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error, dispatch, alert]);

  return loading ? (
    <Loader />
  ) : (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Blog App
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {/* <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link> */}

        <Button disabled={loading} type="submit">
          Login
        </Button>
        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
