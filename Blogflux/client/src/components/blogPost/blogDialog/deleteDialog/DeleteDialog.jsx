import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./deleteDialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../../../fatures/blog/blogSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ onDeleteDialog, trueDialog, post }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogs);

  const handleClickOpen = () => {
    onDeleteDialog(true);
  };

  const handleClose = () => {
    onDeleteDialog(false);
  };

  const handleDeleteBlog = async () => {
    await dispatch(deleteBlog(post._id));
    onDeleteDialog(false);
  };

  return (
    <>
      <Dialog
        open={trueDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="dialogTitle"
          >
            {"Delete your blog"}
            <ClearIcon
              onClick={handleClose}
              sx={{
                fontSize: "28px",
                color: "#555555",
                transition: ".2s",
                "&:hover": {
                  transform: "scale(1.08)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            />
          </DialogTitle>
          <DialogContent className="scrollBarDialog">
            <img src={post.image} style={{ width: "100%" }} alt="" />
          </DialogContent>
          <DialogActions>
            <p className="dialogPostTitle">{post.title}</p>
          </DialogActions>

          <DialogActions>
            <Button
              sx={{
                fontSize: "17px",
                marginRight: "auto",
                marginTop: "-10px",
                marginLeft: "5px",
              }}
              onClick={handleDeleteBlog}
            >
              {loading ? (
                <Box sx={{ width: "10px", mb: "-5px", mt: "2px" }}>
                  <CircularProgress sx={{ml: '-10px'}} size={25} color="inherit" />
                </Box>
              ) : (
                "DELETE"
              )}
            </Button>
          </DialogActions>
        </>

        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
