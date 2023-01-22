import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const myBlogsReducer = createReducer(initialState, {
  myBlogsRequest: (state) => {
    state.loading = true;
  },
  myBlogsSuccess: (state, action) => {
    state.loading = false;
    state.blogs = action.payload;
  },
  myBlogsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  newBlogRequest: (state) => {
    state.loading = true;
  },
  newBlogSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newBlogFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteBlogRequest: (state) => {
    state.loading = true;
  },
  deleteBlogSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteBlogFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
