import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "immer";
import serverUrl from "../../util/baseUrl";


const token = localStorage.getItem("token");
const userid = localStorage.getItem("id");

export const getAllBlogs = createAsyncThunk(
  "/post",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${serverUrl}/post`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


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
        `${serverUrl}/post`,
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

export const updateBlog = createAsyncThunk(
  "post/updateBlog",
  async (postData, { rejectWithValue }) => {
    try {
      console.log(postData)
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("image", postData.PostImage);
      
      const response = await axios.patch(
        `${serverUrl}/post/${postData.postId}`,
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
        `${serverUrl}/post/${postId}`,
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

export const createRating = createAsyncThunk(
  "/post/like",
  async ({ postId, rating }, { rejectWithValue }) => {
    console.log( postId, rating)
    try {
      const res = await axios.post(
        `${serverUrl}/post/like/${postId}`,
        { rating },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComments = createAsyncThunk(
  "/comment",
  async ({ content, id }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${serverUrl}/post/comment/${id}`,
        { content },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { postId: id, comment: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const deleteComment = createAsyncThunk(
  "/comment/delete",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${serverUrl}/post/comment/${postId}/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })


      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload)
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBlog.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })


      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        // const index = state.posts.findIndex((post) => post._id === updatedPost._id);
        // if (index !== -1) {
        //   state.posts[index] = updatedPost;
        // }
        const post = state.posts.find((post) => post._id === updatedPost._id);
        if (post) {
          post.title = updatedPost.title;
          post.content = updatedPost.content;
          post.image = updatedPost.image;
          // Update any other fields as necessary
        }
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRating.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const post = state.posts.find((post) => post._id === updatedPost._id);
        if (post) {
          post.likes = updatedPost.likes;
        }
      })
      .addCase(createComments.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.comments.push(comment.comments.slice(-1)[0]);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.comments = post.comments.filter(
            (comment) => comment._id !== commentId
          );
        }
      });
  },
});

export default blogSlice.reducer;
