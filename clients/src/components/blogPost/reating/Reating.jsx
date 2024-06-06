import React, { useEffect } from "react";
import "./reating.scss";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import timeAgo from "../../../util/DateAndTime";

const Reating = ({ reating, postId }) => {
  // console.log(reating);
  // console.log(postId);
  // console.log(reating.rating);

  return (
    <div className="ReatingContainer">
      <div className="users">
        {reating.user.avatar ? (
          <img className="ReatingAvatar" src={reating.user.avatar} alt="" />
        ) : (
          <p className="withoutReatingAvatar">
            {reating.user.userName?.slice(0, 2)}
          </p>
        )}
        <div className="nameAndTime">
          <p className="ReatingAuthor">{reating.user.userName}</p>
          <p className="ReatingTime">{timeAgo(reating?.createdOn)}</p>
        </div>
      </div>
      <div className="Reating">
        <Stack spacing={1}>
          <Rating
            name="half-rating-read"
            style={{ fontSize: "36px", color: "#002348e8" }}
            defaultValue={reating.rating}
            precision={0.5}
            readOnly
          />
        </Stack>
      </div>
    </div>
  );
};

export default Reating;
