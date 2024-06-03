import React from "react";
import BlogPost from "./../../components/blogPost/BlogPost";

import "./blog.scss";
import TopBlogs from "../topBlogs/TopBlogs";
import TopBloggers from "../topBloggers/TopBloggers";

const Blog = () => {
 
  return (
    <main className="container">
      <div className="top-bloggers">
        <TopBloggers />
      </div>
      <div className="post-container">
        <BlogPost />
      </div>
      <div className="top-blogs">
        <TopBlogs />
      </div>
    </main>
  );
};

export default Blog;
