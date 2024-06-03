// profileSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../../util/baseUrl";

export const userProfile = createAsyncThunk(
  "user/",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${serverUrl}/users/profile`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (postData, { rejectWithValue }) => {
    try {
      console.log(postData);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("userName", postData.userName);
      formData.append("avatar", postData.updateUserImage);

      const response = await axios.patch(
        `${serverUrl}/users/`,
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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.clear(); 
      console.log("User signed out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});


export const { signOut } = profileSlice.actions;
export default profileSlice.reducer;
