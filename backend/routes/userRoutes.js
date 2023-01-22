import express from "express";
import {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getMyBlogs,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/blogs").get(isAuthenticated, getMyBlogs);

export default router;
