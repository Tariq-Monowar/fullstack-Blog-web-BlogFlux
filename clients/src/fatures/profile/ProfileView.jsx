import React, { useEffect, useState } from "react";
import "./profile.scss";
import { RiQuillPenFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../blog/blogSlice";
import Post from "../../components/blogPost/posts/Post";
import UserProfileUpdateDialog from "../../components/userProfileUpdateDialog/UserProfileUpdateDialog";
import { signOut } from "./profileSlice";

const Profile = () => {
  const userid = localStorage.getItem("id");
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);
  const { user, loading } = useSelector((state) => state.userProfile);
  const c = useSelector((state) => console.log(state.userProfile));

  useEffect(() => {
    if (!posts.length) {
      console.log("dispatch");
      dispatch(getAllBlogs());
    }
  }, [dispatch]);

  // console.log(user)

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
    dispatch(signOut());
    // window.location.reload();
  };

  return (
    <>
      <main className="profileContainer">
        <div className="ProfileContainer">
          <div className="profilePicture">
            {user?.avatar ? (
              <div className="imageurl">
                <img
                  className="imageAvatar"
                  src={user?.avatar}
                  alt={user?.userName}
                />
              </div>
            ) : (
              <div className="withoutImageurl" draggable>
                <span>{user?.userName?.slice(0, 2)}</span>
              </div>
            )}
          </div>
          <div className="UpDateImage">
            <RiQuillPenFill
              onClick={() => setOpenProfileDialog(true)}
              className="updateIcon"
            />
          </div>
          <p className="userName">{user?.userName}</p>
          <button className="signout" onClick={handleLogOut}>
            signout
          </button>
        </div>

        <div className="ownPostContent">
          {posts
            .filter((post) => post.user._id === userid)
            .slice()
            .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
            .map((post) => {
              return <Post post={post} />;
            })}
        </div>
      </main>
      <UserProfileUpdateDialog
        openProfileDialog={openProfileDialog}
        setOpenProfileDialog={setOpenProfileDialog}
        user={user}
        loading={loading}
      />
    </>
  );
};

export default Profile;
