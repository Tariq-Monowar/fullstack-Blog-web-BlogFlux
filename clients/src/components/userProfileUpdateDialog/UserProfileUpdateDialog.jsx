import React, { useEffect, useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ClearIcon from "@mui/icons-material/Clear";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { IoClose } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

import "./userProfileUpdateDialog.scss";
import { useDispatch } from "react-redux";
import { updateUser } from "../../fatures/profile/profileSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserProfileUpdateDialog({
  openProfileDialog,
  setOpenProfileDialog,
  user,
  loading,
}) {
  const dispatch = useDispatch();

  const [updateUserImage, setUpdateUserImage] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user?.avatar) {
      setUpdateUserImage(user.avatar);
    }
  }, []);

  const handleClickOpen = () => {
    setOpenProfileDialog(true);
  };

  const handleClose = () => {
    setOpenProfileDialog(false);
  };
  console.log(userName);
  const submitUpdateData = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ updateUserImage, userName }));
    setOpenProfileDialog(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={openProfileDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="dialogTitle"
        >
          {"Update Your profile"}
          <ClearIcon
            onClick={handleClose}
            sx={{
              fontSize: "28px",
              color: "#555555",
              transition: ".2s",
              mt: "-5px",
              mr: "-5px",
              "&:hover": {
                transform: "scale(1.08)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          />
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
          }}
          // dividers
        >
          <form onSubmit={submitUpdateData} className="userupdateSection">
            {updateUserImage ? (
              <div className="userImg">
                <span
                  onClick={() => setUpdateUserImage(null)}
                  className="crosImage"
                >
                  <IoClose className="crosImageIcon-profile" />
                </span>
                <img
                  className="userImages"
                  src={
                    updateUserImage instanceof File
                      ? URL.createObjectURL(updateUserImage)
                      : updateUserImage
                  }
                />
              </div>
            ) : (
              <label className="upDateIconImage" htmlFor="images">
                <IoMdImages className="icon" />
              </label>
            )}

            <input
              style={{
                display: "none",
              }}
              onChange={(e) => setUpdateUserImage(e.target.files[0])}
              accept="image/*"
              type="file"
              name="image"
              id="images"
            />
            <input
              className="userNameInput"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              placeholder={user?.userName}
              type="text"
              name="userName"
            />

            <Button
              type="submit"
              id="submitBtn"
              sx={{
                textAlign: "center",
                textTransform: "none",
                borderRadius: "10px",
                background: "#8d8d8d",
                width: "270px",
                marginTop: "25px",
                paddingTop: "4px",
                paddingBottom: "4px",
                fontSize: "17px",
                "&:hover": {
                  background: "#707070",
                },
              }}
              variant="contained"
              disableElevation
            >
              {loading ? (
                <Box sx={{ width: "10px", mb: "-5px", mt: "2px" }}>
                  <CircularProgress size={25} color="inherit" />
                </Box>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
