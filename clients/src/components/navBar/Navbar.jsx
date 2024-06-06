import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../fatures/profile/profileSlice";
import { FaBars } from "react-icons/fa6";

import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

const Navbar = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const { userIndata } = useSelector((state) => state.signin);
  const { userUpdata } = useSelector((state) => state.signup);
  const [showNavItem, setShowNavItem] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(userProfile());
    }
  }, [token, user, dispatch, userIndata, userUpdata]);

  return (
    <nav
      className={`navbarContainer ${showNavItem ? "expanded" : "collapsed"}`}
    >
      <div className="navbarContent">
        <h1 className="app-logo" onClick={() => navigate("/")}>
          Blogflux
        </h1>
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
              onClick={() => navigate("/profile")}
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
        <div className="openBar">
          <FaBars
            onClick={() => setShowNavItem(!showNavItem)}
            className="barIcon"
          />
        </div>
      </div>
      {showNavItem && (
        <div className="navItemMobile">
          <List>
            {user ? (
              <ListItemButton
                onClick={() => {
                  navigate("/profile");
                  setShowNavItem(false);
                }}
              >
                <div className="profileIconContainer">
                  {user.avatar ? (
                    <img className="profileImage" src={user?.avatar} alt="" />
                  ) : (
                    <p className="withoutImage">{user.userName?.slice(0, 2)}</p>
                  )}
                </div>
                <p className="navItemUserName">{user.userName}</p>
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  navigate("/join");
                  setShowNavItem(false);
                }}
              >
                <p className="barItem">join</p>
              </ListItemButton>
            )}
            <Divider />
            <ListItemButton
              onClick={() => {
                navigate("/");
                setShowNavItem(false);
              }}
            >
              <p className="barItem">Home</p>
            </ListItemButton>
            <Divider />
            {user && (
              <ListItemButton
                onClick={() => {
                  navigate("/createblog");
                  setShowNavItem(false);
                }}
              >
                <p className="barItem">create blog</p>
              </ListItemButton>
            )}
          </List>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
