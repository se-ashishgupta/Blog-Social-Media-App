import axios from "axios";
import { server } from "../store";

export const createNewblog = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newBlogRequest",
    });

    const { data } = await axios.post(
      `${server}/blog/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "newBlogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newBlogFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateBlog = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${server}/blog/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBlogRequest",
    });

    const { data } = await axios.delete(`${server}/blog/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteBlogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteBlogFailure",
      payload: error.response.data.message,
    });
  }
};
