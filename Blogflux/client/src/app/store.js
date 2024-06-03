import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../fatures/join/signup/signupSlice";
import signinReducer from "../fatures/join/SignIn/signinSlice";
import userProfileReducers from "../fatures/profile/profileSlice";
import createBlogReducers from "../fatures/createBlog/CreateBlogSlice";
import blogs from "../fatures/blog/blogSlice";
import topBlogsReducer from "../fatures/topBlogs/TopBlogsSlice";
import topBloggersReducer from "../fatures/topBloggers/topBloggersSlice"
const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    userProfile: userProfileReducers,
    createBlog: createBlogReducers,
    blogs: blogs,
    topBlogs: topBlogsReducer,
    topBloggers: topBloggersReducer
  },
});
export default store;
