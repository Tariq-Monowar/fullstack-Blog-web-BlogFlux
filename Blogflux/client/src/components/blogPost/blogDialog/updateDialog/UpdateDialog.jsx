import "./updatedialog.scss";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import JoditEditor from "jodit-react";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";

import { updateBlog } from "../../../../fatures/blog/blogSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateDialog({ onUldateDialog, openDialog, post }) {
  // const handleClickOpen = () => {
  //   onUldateDialog(true);
  // };
  const { loading } = useSelector((state) => state.blogs);

  const handleClose = () => {
    onUldateDialog(false);
  };

  const userName = useSelector((state) => state?.userProfile?.user?.userName);
  const dispatch = useDispatch();
  const [PostImage, setPostImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editor = useRef(null);

  // useEffect(() => {
  //   setTitle(post.title)
  //   setContent(post.content)
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postId = post._id;
    await dispatch(updateBlog({ PostImage, title, content, postId }));
    handleClose();
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            // position: "relative",
            position: "fixt",
            backgroundColor: "#fff",
            color: "#000",
            boxShadow:
              "2px 1px 3px 0px rgba(50, 50, 93, 0.16), 0 3px 7px -3px rgba(0, 0, 0, 0.11)",
          }}
        >
          <Toolbar sx={{}}>
            <Typography
              className="updateTitle"
              sx={{ flex: 1 }}
              variant="h6"
              component="div"
            >
              Update Your Blog
            </Typography>
            {/* <Button
              className="saveButton"
              sx={{
                background: "#d3d3d3",
                transition: '.2s',
                 
                "&:hover": {
                  // transform: "scale(1.08)",
                  background: "#d3d3d3",
                },
                "&:active": {
                  // transform: "scale(0.95)",
                },
              }}
              autoFocus
              color="inherit"
              onClick={handleClose}
            >
              save
            </Button> */}
            <IconButton
              edge="start"
              color="inherit"
              sx={{ color: "#353434" }}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="createBlogContainer">
          <form onSubmit={handleSubmit}>
            <div className="createBlogContent">
              <h1>
                what's on your mind,{" "}
                {userName?.split(" ").slice(0, 2).join(" ")}?
              </h1>
              <div className="PostImage">
                <input
                  onChange={(e) => setPostImage(e.target.files[0])}
                  type="file"
                  name=""
                  id=""
                  accept="image/*"
                />
              </div>
              <div className="postTitle">
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || post.title}
                  placeholder="Enter title"
                />
              </div>
              <div className="content">
                <JoditEditor
                  className="JoditEditor"
                  ref={editor}
                  value={content || post.content}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                />
              </div>
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  marginTop: "22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    color: "#343434",
                    borderColor: "#808080",
                    width: "150px",
                    fontSize: "15px",
                    "&:hover": {
                      backgroundColor: "#686868",
                      borderColor: "#686868",
                      color: "#FFF",
                    },
                    "&:active": {
                      borderColor: "#969696",
                    },
                  }}
                  variant="outlined"
                >
                  {loading ? (
                    <Box sx={{ width: "10px", mb: "-5px", mt: "2px" }}>
                      <CircularProgress size={25} color="inherit" />
                    </Box>
                  ) : (
                    "Update blog"
                  )}
                </Button>
              </Stack>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
