import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegStar } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { BsPostcardHeart } from "react-icons/bs";

import "./topbloggers.scss";

import { getTopBlogers } from "./topBloggersSlice";
const TopBlogres = () => {
  const dispatch = useDispatch();
  const bloggers = useSelector((state) => state.topBloggers);

  useEffect(() => {
    if (!bloggers.bloger.length) {
      console.log("diapatch top bloggers");
      dispatch(getTopBlogers());
    }
  }, [dispatch]);

  return (
    <div className="topBlogersContainer">
      {/* {bloggers?.bloger?.length > 0 && (
        <h2 className="title">Flex top blogs</h2>
      )} */}
      {bloggers?.bloger &&
        bloggers?.bloger.slice(0, 5).map((blogger) => {
          return (
            <div key={blogger?.user?._id} className="topBloggers" draggable>
              <div className="users">
                {blogger.user.avatar ? (
                  <img
                    className="topBloggeImage"
                    src={blogger.user.avatar}
                    alt=""
                  />
                ) : (
                  <p className="topBloggeWithoutImage">
                    {blogger.user.userName.slice(0, 2)}
                  </p>
                )}
                <p className="userName">{blogger.user.userName}</p>
              </div>

              <div className="popularityContent">
                <div className="count">
                  <FaRegStar className="icon" />
                  <span className="tottle">
                    {Math.round(blogger.totalLikes * 2) / 2}
                  </span>
                </div>
                <div className="count">
                  <FaRegComment style={{ fontSize: "22px" }} className="icon" />
                  <span className="tottle"> {blogger.totalComments}</span>
                </div>
                <div className="count">
                  <BsPostcardHeart
                    style={{ fontSize: "22px" }}
                    className="icon"
                  />
                  <span className="tottle"> {blogger.totalPosts}</span>
                </div>
                {/* <div className="count">
                  <TbFileLike
                    style={{ fontSize: "22px" }}
                    className="icon"
                  />
                  <span className="tottle"> {Math.round(blogger.averageRating * 2) / 2}</span>
                </div> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TopBlogres;
