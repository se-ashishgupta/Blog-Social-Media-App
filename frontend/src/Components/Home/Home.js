import React, { useEffect } from "react";
import "./Home.css";
import Blog from "../Blog/Blog";
import { getFallowingBlogs } from "../../Action/userAction";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, blogs, error } = useSelector(
    (state) => state.blogOfFollowing
  );

  useEffect(() => {
    dispatch(getFallowingBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error, dispatch, alert]);

  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
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

export default Home;
