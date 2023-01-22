import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateCaption,
} from "../controllers/userBlogController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/blog/upload").post(isAuthenticated, createBlog);

router
  .route("/blog/:id")
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deleteBlog);

router.route("/allblogs").get(isAuthenticated, getAllBlogs);

export default router;
