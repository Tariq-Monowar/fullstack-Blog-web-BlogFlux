import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import "./signup.scss";
import { createUser } from "./signupSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userUpData } = useSelector((state) => state.signup);
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   let res = await dispatch(createUser(signupData));
    setErrorVisible(true);
    if(res?.type === "api/createUser/fulfilled"){
      window.location.reload()
    }
    console.log(res)
  };

  useEffect(() => {
    if (userUpData) {
      navigate("/");
    }
  }, [userUpData, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div className="signup-container">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "min(95vw, 500px)",
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-root": { borderRadius: "20px" },
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <FormControl
              sx={{
                m: 1,
                width: "min(95vw, 500px)",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#002348",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#002348",
                  },
                },
              }}
              variant="outlined"
            >
              <InputLabel
                sx={{
                  "&.Mui-focused": {
                    color: "#002348",
                  },
                }}
                htmlFor="outlined-adornment-username"
              >
                User Name
              </InputLabel>
              <OutlinedInput
                name="userName"
                value={signupData.userName}
                onChange={handleChange}
                id="outlined-adornment-username"
                label="User Name"
                placeholder="User Name"
                multiline
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                m: 1,
                width: "min(95vw, 500px)",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#002348",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#002348",
                  },
                },
              }}
              variant="outlined"
            >
              <InputLabel
                sx={{
                  "&.Mui-focused": {
                    color: "#002348",
                  },
                }}
                htmlFor="outlined-adornment-email"
              >
                Email
              </InputLabel>
              <OutlinedInput
                name="email"
                value={signupData.email}
                onChange={handleChange}
                id="outlined-adornment-email"
                label="Email"
                placeholder="ex@gmail.com"
                multiline
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                m: 1,
                width: "min(95vw, 500px)",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#002348", // border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#002348", // border color when focused
                  },
                },
              }}
              variant="outlined"
            >
              <InputLabel
                sx={{
                  "&.Mui-focused": {
                    color: "#002348", // Set the color when the input field is focused
                  },
                }}
                htmlFor="outlined-adornment-password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="******"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              marginTop: "15px",
              marginLeft: "15px",
            }}
          >
            <Button
              type="submit"
              sx={{
                color: "#002348",
                borderColor: "#002348",
                width: "100px",
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#002348",
                  borderColor: "#002348",
                  color: "#FFF",
                },
                "&:active": {
                  borderColor: "#3e506a",
                },
              }}
              variant="outlined"
            >
              {loading ? (
                <Box
                  sx={{
                    width: "10px",
                    mb: "-7px",
                    mt: "1px",
                    textAlign: "center",
                  }}
                >
                  <CircularProgress
                    sx={{ ml: "-6px" }}
                    size={23}
                    color="inherit"
                  />
                </Box>
              ) : (
                "SignUp"
              )}
            </Button>
          </Stack>
        </Box>
      </div>
      {error && errorVisible && (
        <Stack
          sx={{
            position: "absolute",
            zIndex: '30',
            width: "min(90vw, 470px)",
            top: 0,
            mt: "30px",
          }}
          spacing={2}
        >
          <Alert sx={{ bgcolor: "#ffbfbfdb" }} severity="error">
            {error}
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default SignUp;
