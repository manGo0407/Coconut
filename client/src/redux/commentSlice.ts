import { createSlice } from "@reduxjs/toolkit";
import { CommentType, CommentsType } from "../types";
import { allComments } from "./thunkActions";
// import {  } from './thunkActions';

type initialStateType = {
  comments: CommentType[];
};

const initialState: initialStateType = {
  comments: [],
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
