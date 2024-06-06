import React, { useEffect, useState } from "react";
import "./BlogPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../fatures/blog/blogSlice";

import Post from "./posts/Post";

const BlogPost = () => {
  const post = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post.posts.length == []) {
      console.log("dispatch from blog")
      dispatch(getAllBlogs());
    }
  }, [dispatch]);

  return (
    <>
      {post.posts &&
        post.posts
          .slice()
          .reverse()
          // .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
          .map((post) => {
            return <Post key={post._id} post={post}/>;
          })}
    </>
  );
};

export default BlogPost;



// const myLike = post?.likes?.find(
//   (like) => like.user._id === userid
// return <Post key={post._id} post={post} myLike={myLike} />;