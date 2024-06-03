import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../../util/baseUrl";

export const getTopBlogs = createAsyncThunk(
  "blog/getTopBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${serverUrl}/post/topblogs`);

      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const topClassBlogSlice = createSlice({
  name: "topClassBlog",
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getTopBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topClassBlogSlice.reducer;
