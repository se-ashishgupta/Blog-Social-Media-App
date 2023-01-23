import { configureStore } from "@reduxjs/toolkit";
import { blogOfFollwoingReducer, userReducer } from "./Reducers/userReducer";
import { myBlogsReducer } from "./Reducers/blogReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogOfFollowing: blogOfFollwoingReducer,
    myBlogs: myBlogsReducer,
  },
});

export default store;

export const server = process.env.REACT_APP_SERVER_API;
