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

export const server = "http://localhost:4000/api/v1";
// export const server = "https://blogappbackend-8b3k.onrender.com/api/v1";
