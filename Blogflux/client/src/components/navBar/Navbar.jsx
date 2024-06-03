import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../fatures/profile/profileSlice";

const Navbar = () => {
  const naviagte = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const { userIndata } = useSelector((state) => state.signin);
  const { userUpdata } = useSelector((state) => state.signup);

  // console.log(user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(userProfile());
    }
  }, [token, user, dispatch, userIndata, userUpdata]);

  return (
    <nav className="navbarContainer">
      <div className="navbarContent">
        <h1 className="app-logo" onClick={()=>naviagte("/")}>Blogflux</h1>
        <div className="navItem">
          <NavLink className="nav-list" to="/">
            Home
          </NavLink>
          {user && (
            <NavLink className="nav-list createBlog" to="/createblog">
              create blog
            </NavLink>
          )}

          {user ? (
            <div
              onClick={() => naviagte("/profile")}
              className="profileIconContainer"
            >
              {user.avatar ? (
                <img className="profileImage" src={user.avatar} alt="" />
              ) : (
                <p className="withoutImage">{user.userName.slice(0, 2)}</p>
              )}
            </div>
          ) : (
            <NavLink className="nav-list" to="/join">
              join
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
