import React, { useRef, useState } from "react";
import "./createBlog.scss";
import JoditEditor from "jodit-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import BlogPost from "./../../components/blogPost/BlogPost";
import { createBlog } from "../blog/blogSlice";
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const userName = useSelector((state) => state?.userProfile?.user?.userName);
  const { loading } = useSelector((state) => state.createBlog);
  const dispatch = useDispatch();
  const [PostImage, setPostImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log(PostImage, title, content);

  const editor = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(createBlog({ PostImage, title, content }));
    // Clear form fields after successful submission
    setTitle("");
    setContent("");
    setPostImage(null);
    navigate("/");
  };

  return (
    <>
      <div className="createBlogContainer">
        <form onSubmit={handleSubmit}>
          <div className="createBlogContent">
            <h1>
              what's on your mind, {userName?.split(" ").slice(0, 2).join(" ")}?
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
                value={title}
                placeholder="Enter title"
              />
            </div>
            <div className="content">
              <JoditEditor
                className="JoditEditor"
                ref={editor}
                value={content}
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
                {/* create blog */}
                {loading ? (
                  <Box sx={{ width: "10px", mb: "-5px", mt: "0px" }}>
                    <CircularProgress sx={{marginLeft: '-4px'}} size={24} color="inherit" />
                  </Box>
                ) : (
                  "create blog "
                )}
              </Button>
              {/*<span className="AiPost">Ai 🤖</span>*/}
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
