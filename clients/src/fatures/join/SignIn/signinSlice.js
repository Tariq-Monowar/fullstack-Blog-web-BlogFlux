import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../../../util/baseUrl";

export const signinUser = createAsyncThunk(
  "api/signinUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverUrl}/users/login`,
        userData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user._id);
      
      console.log(response.data)
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    loading: false,
    userIndata: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userIndata = action.payload; 
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});


export default signInSlice.reducer