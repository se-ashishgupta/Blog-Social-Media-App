import { DeleteOutline, MoreVert } from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../../Action/blogAction";
import { getMyBlogs } from "../../Action/userAction";

const Blog = ({
  blogId,
  caption,
  blogImage,
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  createdAt,
}) => {
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updateBlog(captionValue, blogId));
    dispatch(getMyBlogs());
  };

  const deleteBlogHandler = async () => {
    await dispatch(deleteBlog(blogId));
    dispatch(getMyBlogs());
  };

  return (
    <div className="blog">
      <div className="blogHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={blogImage} alt="Blog" />
      <div className="blogDetails">
        <Avatar
          rec={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <div className="blogFooter">
        {isDelete ? (
          <Button onClick={deleteBlogHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {createdAt}
        </Typography>
      </div>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
          <form className="captionForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here....."
              required
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Blog;
