import { DeleteOutline, MoreVert } from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
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

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateBlog(captionValue, blogId));
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
            sx={{ height: "4vmax", width: "4vmax" }}
          />
          <div>
            <Typography fontWeight={700} sx={{ fontSize: "1.4vmax" }}>
              {ownerName}
            </Typography>

            <Typography fontWeight={300} sx={{ fontSize: "1.2vmax" }}>
              {stringPostDate}
            </Typography>
          </div>
        </div>

        <div>
          {isAccount ? (
            <Button onClick={() => setCaptionToggle(!captionToggle)}>
              <MoreVert sx={{ fontSize: "2vmax" }} />
            </Button>
          ) : null}
          {isDelete ? (
            <Button onClick={deleteBlogHandler}>
              <DeleteOutline sx={{ fontSize: "2vmax" }} />
            </Button>
          ) : null}
        </div>
      </div>
      <img src={blogImage} alt="Blog" />

      <div className="blogFooter">
        <Typography
          fontWeight={300}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

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
