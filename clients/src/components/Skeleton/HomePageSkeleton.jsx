import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonItem = () => (
  <>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Skeleton variant="circular" width={45} height={45} />
      <div>
        <Skeleton
          variant="text"
          height={26}
          width={200}
          sx={{ fontSize: "1rem", ml: 1 }}
        />
        <Skeleton
          variant="text"
          height={15}
          width={100}
          sx={{ fontSize: "1rem", ml: 1 }}
        />
      </div>
    </div>
    <Skeleton variant="rectangular" height={450} sx={{ borderRadius: 5 }} />
    <Skeleton variant="rounded" height={70} sx={{ borderRadius: 5 }} />
  </>
);

export const PostSkeleton = () => {
  return (
    <div style={{ marginTop: "1.2rem", marginBottom: "3rem" }}>
      <Stack spacing={1}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </Stack>
    </div>
  );
};

export const TopBlogSkeleton = () => {
  return (
    <div style={{ marginTop: "2rem", padding: "0 10px" }}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 5}} />
        <br />
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 5}} />
        <br />
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 5}} />
        <br />
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 5}} />
      </Stack>
    </div>
  );
};