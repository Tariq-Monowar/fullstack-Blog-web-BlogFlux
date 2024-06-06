import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../../../util/baseUrl";

// export const createUser = createAsyncThunk(
//   "api/createuser",
//   async (userData) => {
//     const res = await axios.post("http://localhost:1000/users", userData);
//     console.log(res.data)
//     return res.data;
//   }
// );

export const createUser = createAsyncThunk(
  "api/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}/users/`, userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user._id);
      return response.data.user; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signupSlice = createSlice({
  name: "signUp",
  initialState: {
    loading: false,
    userUpData: null, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userUpData = action.payload; 
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default signupSlice.reducer;
