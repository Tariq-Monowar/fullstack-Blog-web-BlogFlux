import React, { useState } from "react";

import "./comment.scss";

import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../fatures/blog/blogSlice";
import timeAgo from "../../../util/DateAndTime";

const Comment = ({ onComment, onId }) => {
  const myUserId = localStorage.getItem("id");

  const dispatch = useDispatch();
  const comment = onComment;
  const postId = onId;

  const handleDelete = () => {
    const commentId = comment._id;
    dispatch(deleteComment({ postId, commentId }));
  };

  const [showComment, setshowComment] = useState(false);

  const showMore = (content) => {
    if (content.length > 120 && !showComment) {
      return content.slice(0, 120);
    } else return content;
  };

  return (
    <div className="comment">
      <div className="commentHeader">
        <div className="commentTitle">
          {comment.user.avatar ? (
            <img className="commentAvatar" src={comment.user.avatar} alt="" />
          ) : (
            <p className="withoutCommentAvatar">
              {comment.user.userName?.slice(0, 2)}
            </p>
          )}
          <div className="nameAndTime">
            <p className="commentAuthor">{comment.user.userName}</p>
            <p className="commentTime">{timeAgo(comment?.createdOn)}</p>
          </div>
        </div>

        {myUserId === comment.user._id && (
          <button className="commentdelete" onMouseDown={handleDelete}>
            <MdDeleteSweep className="deleteIcon" />
          </button>
        )}
      </div>

      <div className="commentBody">
        <p>
          {showMore(comment.content)}
          <span
            className="showMore"
            onClick={() => setshowComment(!showComment)}
          >
            {showComment
              ? "show less"
              : comment.content.length > 120
              ? "Show More"
              : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Comment;
