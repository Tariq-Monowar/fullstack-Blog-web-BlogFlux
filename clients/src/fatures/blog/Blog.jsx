import React, { useCallback, useEffect, useState } from "react";
import BlogPost from "./../../components/blogPost/BlogPost";
import "./blog.scss";
import TopBlogs from "../topBlogs/TopBlogs";
import TopBloggers from "../topBloggers/TopBloggers";
import { useSelector } from "react-redux";
import {
  PostSkeleton,
  TopBlogSkeleton,
} from "./../../components/Skeleton/HomePageSkeleton";

const Blog = () => {
  const { posts } = useSelector((state) => state.topBlogs);
  const blogs = useSelector((state) => state.blogs);
  const topBlogs = useSelector((state) => state.topBlogs);
  const topBlog = useSelector((state) => state.topBlogs);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  console.log(windowWidth);

  return (
    <>
      <main className="container">
        <div className="top-bloggers">
          {topBlogs?.loading ? <TopBlogSkeleton /> : <TopBloggers />}

          {windowWidth <= 1300 && (
            <>
              {posts.length > 0 && (
                <h2 className="topBlogflux">Top Blogflux</h2>
              )}
              <TopBlogs />
            </>
          )}
        </div>
        <div className="post-container">
          {blogs?.loading ? <PostSkeleton /> : <BlogPost />}
        </div>
        <div className="top-blogs">
          {windowWidth > 1300 && topBlog?.loading ? (
            <TopBlogSkeleton />
          ) : (
            <TopBlogs />
          )}
        </div>
      </main>
    </>
  );
};

export default Blog;
