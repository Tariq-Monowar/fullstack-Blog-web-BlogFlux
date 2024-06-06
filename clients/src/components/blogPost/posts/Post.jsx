import React, { useEffect, useState, useRef } from "react";
import "../BlogPost.scss";
import { formatDistanceToNow } from 'date-fns';
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { FaBullseye, FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { createRating, createComments } from "../../../fatures/blog/blogSlice";
import Comment from "../comment/Comment";
import Reating from "../reating/Reating";
import DeleteDialog from "../blogDialog/deleteDialog/DeleteDialog";
import UpdateDialog from "../blogDialog/updateDialog/UpdateDialog";
import timeAgo from "../../../util/DateAndTime";

// Labels for different rating values
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

// Function to get label text for a rating value
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Post = ({ post }) => {
  const userid = localStorage.getItem("id");
  const dispatch = useDispatch();
 
  const [value, setValue] = useState(0); // Rating value
  const [hover, setHover] = useState(-1); // Hovered rating 
  const [comment, setComment] = useState(""); // Comment
  const [showEmoji, setShowEmoji] = useState(false); // Emoji
  const [visibleComments, setVisibleComments] = useState(2); 
  const [visibleContent, setVisibleContent] = useState(false); 
  const [shouldShowComment, setShouldShowComment] = useState(false);
  const [shouldShowReating, setShouldShowReating] = useState(false);
  //this state for dialog
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);

  console.log(post)
  // Refs for DOM elements
  const commentTextarea = useRef(null);
  const pickerRef = useRef(null);

  // Set initial rating value if already liked
  // useEffect(() => {
  //   myLike?.rating && setValue(myLike?.rating);
  // }, [myLike?.rating]);

  // Close emoji picker when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        commentTextarea.current &&
        !commentTextarea.current.contains(event.target)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [pickerRef, showEmoji]);

  // Handle rating change
  const handleRatingChange = async (event, newValue) => {
    let postId = post._id;
    setValue(newValue);
    setShouldShowReating(false);
    await dispatch(createRating({ postId, rating: newValue }));
    setShouldShowComment(false);
    setShouldShowReating(true);
  };

  // Adjust height of comment textarea based on content
  const setTextareaHeight = () => {
    if (commentTextarea.current) {
      commentTextarea.current.style.height = "36px";
      commentTextarea.current.style.height = `${commentTextarea.current.scrollHeight}px`;
    }
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setTextareaHeight();
  };

  // Add emoji to comment
  const addEmoji = (emoji) => {
    setComment((prevComment) => prevComment + emoji.native);
  };

  // Create comment
  const createComment = () => {
    let postId = post._id;
    try {
      dispatch(createComments({ content: comment, id: postId }));
      setComment("");
      setShouldShowComment(true);
      setShouldShowReating(false);
      commentTextarea.current.style.height = "36px";
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle comments
  const toggleComments = () => {
    if (visibleComments === 2) {
      setVisibleComments(post.comments.length);
    } else {
      setVisibleComments(2);
    }
  };

  const totalReating = post.likes.reduce((sum, like) => sum + like.rating, 0);
  
  const myreating = post?.likes?.filter(like=> like.user._id === userid)

  return (
    <>
      <div key={post._id} className="postContent">
        <div className="postTitle">
          <div className="postAuthor">
            {post.user?.avatar ? (
              <img src={post.user.avatar} alt="" />
            ) : (
              <p className="postOwnerWithoutImage">
                {post.user?.userName?.slice(0, 2)}
              </p>
            )}
            <div className="nameAndTime">
              <p className="postOwnerName">{post.user?.userName}</p>
              <p className="postTime">{timeAgo(post?.createdOn)}</p>
            </div>
          </div>
          {post.user?._id === userid && (
            <div className="postController">
              <Box
                sx={{ height: 70, transform: "translateZ(0px)", flexGrow: 1 }}
              >
                <SpeedDial
                  direction="left"
                  ariaLabel="SpeedDial basic example"
                  sx={{ right: 0 }}
                  FabProps={{
                    sx: {
                      // border: "none",
                      boxShadow: "none",
                      bgcolor: "#ffffff00",
                      width: "40px",
                      height: "40px",

                      "&:hover": {
                        bgcolor: "#ffffff00",
                        boxShadow: "none",
                      },
                    },
                  }}
                  icon={<BsThreeDotsVertical className="icon" />}
                >
                  <SpeedDialAction
                    onClick={() => {
                      setDeleteDialog(true);
                    }}
                    icon={<DeleteOutlineIcon />}
                    tooltipTitle="Delete"
                    sx={{ marginRight: "-12px" }}
                  />
                  <SpeedDialAction
                    onClick={() => {
                      setUpdateDialog(true);
                    }}
                    icon={<EditIcon />}
                    tooltipTitle="Edit"
                  />
                </SpeedDial>
              </Box>
            </div>
          )}
        </div>
        <div className="PostBody">
          <img
            className="postImage"
            style={{ width: "100%" }}
            src={post.image}
            alt=""
          />
          <div className="TextBody">
            <p className="title">{post.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.slice(
                  0,
                  visibleContent && post.content.length > 500
                    ? post.content.length
                    : 500
                ),
              }}
            />
            {post.content.length > 500 && (
              <div style={{ width: "100%", textAlign: "right" }}>
                <button
                  className="showMoreContent"
                  onClick={() => setVisibleContent(!visibleContent)}
                >
                  {visibleContent ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            )}
          </div>

          <div className="postFooter">
            <div className="likeUnlike">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
                className="ratingBox"
              >
                <Rating
                  name="hover-feedback"
                  style={{ fontSize: "36px", color: "#002348" }}
                  value={value || myreating[0]?.rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={handleRatingChange}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon
                      style={{ fontSize: "36px", color: "#b5b5b5" }}
                      fontSize="inherit"
                    />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
              <div className="reatingCounter">
                <span className="starNumber">{totalReating}</span>
                <FaRegStar className="starIcon" />
              </div>
            </div>
            <div className="commentContainer">
              <textarea
                ref={commentTextarea}
                type="text"
                style={{
                  width: "100%",
                  height: "36px",
                }}
                placeholder="Comment"
                value={comment}
                onChange={handleCommentChange}
              />
              <div className="commentControll">
                <div>
                  <BsEmojiSmile
                    className="emojiShow"
                    onClick={() => setShowEmoji(!showEmoji)}
                  />

                  {post?.comments?.length > 0 && (
                    <FaRegComment
                      onClick={() => {
                        setShouldShowComment(!shouldShowComment);
                        if (!shouldShowComment) {
                          setShouldShowReating(false);
                        }
                      }}
                      className="showCommentIcon"
                    />
                  )}
                  {post?.likes?.length > 0 && (
                    <FaRegStar
                      onClick={() => {
                        setShouldShowReating(!shouldShowReating);
                        if (!shouldShowReating) {
                          setShouldShowComment(false);
                        }
                      }}
                      className="showAllReating"
                    />
                  )}
                </div>

                <button
                  onClick={() => (comment !== "" ? createComment() : "")}
                  style={{ border: "none", background: "transparent" }}
                >
                  <CiLocationArrow1
                    className={
                      comment !== ""
                        ? "submitCommentAnable"
                        : "submitCommentDisable"
                    }
                  />
                </button>

                {showEmoji && (
                  <div
                    ref={pickerRef}
                    style={{ position: "absolute", zIndex: 10 }}
                  >
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      onEmojiSelect={addEmoji}
                      maxFrequentRows={0}
                    />
                  </div>
                )}
              </div>

              {shouldShowComment && (
                <div className="showComment">
                  {post?.comments &&
                    post.comments
                      .slice().reverse().slice(0,visibleComments)
                      .map((comment) => (
                        <Comment
                          key={comment._id}
                          onComment={comment}
                          onId={post._id}
                        />
                      ))}

                  <div className="showMoreContainer">
                    {post.comments.length > 2 && (
                      <button
                        className="showMoreLessButton"
                        onClick={toggleComments}
                      >
                        {visibleComments === 2 ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronUp />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {shouldShowReating &&
                post?.likes.map((like) => {
                  return (
                    <Reating key={like._id} reating={like} postId={post._id} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog
        onDeleteDialog={setDeleteDialog}
        trueDialog={deleteDialog}
        post={post}
      />
      <UpdateDialog
        onUldateDialog={setUpdateDialog}
        openDialog={updateDialog}
        post={post}
      />
    </>
  );
};

export default Post;
