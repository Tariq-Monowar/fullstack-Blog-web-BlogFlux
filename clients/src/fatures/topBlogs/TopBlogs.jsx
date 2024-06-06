import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./topblog.scss";
import { getTopBlogs } from "./TopBlogsSlice";

const TopBlogs = () => {
  const dispatch = useDispatch();
  const topBlog = useSelector((state) => state.topBlogs);
  useEffect(() => {
    if (!topBlog.posts.length) {
      console.log("diapatch top blog")
      dispatch(getTopBlogs());
    }
  }, [dispatch]);

  const titleSlice = (content) => {
    if (content?.length > 45) {
      return content.slice(0, 45) + "...";
    } else return content;
  };

  return (
    <div className="topBlogsContainer">
      {/* {topBlog?.posts?.length > 0 && <h2 className="title">Flex top blogs</h2>} */}
      {topBlog?.posts &&
        topBlog?.posts.slice(0, 5).map((post) => {
          return (
            <div key={post?._id} className="topBlog" draggable>
              <div>
                <div
                  className="topBlogImage"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
              </div>

              <div className="topBlogContent">
                <p className="blogTitle">{titleSlice(post.title)}</p>

                <div className="Reating">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      style={{
                        fontSize: "28px",
                        color: "#6b6b6b",
                        marginLeft: "5px",
                        bottom: 0,
                      }}
                      defaultValue={Math.round(post.averageRating * 2) / 2}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <p className="numberOfReating">{Math.round(post.totalLikes)}+</p>
            </div>
          );
        })}
    </div>
  );
};

export default TopBlogs;
