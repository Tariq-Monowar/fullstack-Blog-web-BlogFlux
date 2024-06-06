import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../../util/baseUrl";

export const getTopBlogers = createAsyncThunk(
  "blog/getTopBloggers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${serverUrl}/post/topbloger`);
      
      return res.data;

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const topClassBlogerSlice = createSlice({
  name: "topClassBlog",
  initialState: {
    loading: false,
    bloger: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopBlogers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopBlogers.fulfilled, (state, action) => {
        state.loading = false;
        state.bloger = action.payload;
        state.error = null;
      })
      .addCase(getTopBlogers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topClassBlogerSlice.reducer;
