import React, { useEffect } from "react";
import "./MyBlogs.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Blog from "../Blog/Blog";
import { useAlert } from "react-alert";
import { getMyBlogs } from "../../Action/userAction";
import Loader from "../Loader/Loader";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading: userLoading } = useSelector((state) => state.user);
  const { loading, blogs, error, message } = useSelector(
    (state) => state.myBlogs
  );

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

  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="myBlogs">
      <div className="myBlogsContent">
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
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <Typography variant="h6"> No Blogs Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
