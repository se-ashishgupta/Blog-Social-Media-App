import React, { useEffect } from "react";
import "./NewBlog.css";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewblog } from "../../Action/blogAction";
import { loadUser } from "../../Action/userAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const NewBlog = () => {
  const [image, setImage] = useState(null);
  const [caption, setcaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.myBlogs);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewblog(caption, image));
    dispatch(loadUser());
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
  }, [error, dispatch, message, alert]);

  return loading ? (
    <Loader />
  ) : (
    <div className="newBlog">
      <form className="newBlogForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Blog</Typography>
        {image && <img src={image} alt="blog" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption...."
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
