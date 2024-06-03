import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createBlog = createAsyncThunk(
  "post/createBlog",
  async (postData, { rejectWithValue }) => {
    console.log(postData.PostImage);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("image", postData.PostImage);

      const response = await axios.post(
        "http://localhost:1000/post",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "post/deleteblog",
  async (postId, { rejectWithValue }) => {
    // console.log(postData.PostImage);
    try {
      console.log(postId);
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:1000/post/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      return postId;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const createBlogSlice = createSlice({
  name: "createBlog",
  initialState: {
    loading: false,
    post: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.post.push(action.payload)
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.post = state.post.filter((post) => post._id !== action.payload);
      });
  },
});

export default createBlogSlice.reducer;
