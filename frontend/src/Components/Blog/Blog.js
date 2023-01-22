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
  const pDate = new Date(createdAt);
  const stringPostDate = pDate.toLocaleString();

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
        <div className="blogDetails">
          <Avatar
            src={ownerImage}
            alt="User"
            sx={{ height: "3vmax", width: "3vmax" }}
          />
          <Link to={`/user/${ownerId}`}>
            <Typography fontWeight={700}>{ownerName}</Typography>
          </Link>
        </div>

        <div>
          {isAccount ? (
            <Button onClick={() => setCaptionToggle(!captionToggle)}>
              Update <MoreVert />
            </Button>
          ) : null}
          {isDelete ? (
            <Button onClick={deleteBlogHandler}>
              <DeleteOutline />
            </Button>
          ) : null}
        </div>
      </div>
      <img src={blogImage} alt="Blog" />
      <Typography fontWeight={300} style={{ alignSelf: "center" }}>
        Posted On:: {stringPostDate}
      </Typography>
      <Typography
        fontWeight={100}
        color="rgba(0,0,0,0.582)"
        style={{ alignSelf: "center" }}
      >
        {caption}
      </Typography>
      <div className="blogFooter"></div>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography className="updateHeading">Update Caption</Typography>
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
