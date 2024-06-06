import React, { useEffect, useState } from "react";
import "./signin.scss";

import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "./signinSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { loading, error, userIndata } = useSelector((state) => state.signin);

  const dispatch = useDispatch();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    let res = await dispatch(signinUser(signinData));
    setErrorVisible(true);
    if (res.type === "api/signinUser/fulfilled") {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (userIndata) {
      navigate("/");
    }
  }, [userIndata, navigate]);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSignin}>
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
                  htmlFor="outlined-adornment-email"
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  name="email"
                  value={signinData.email}
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
                  value={signinData.password}
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
          </Box>

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
                    mb: "-6px",
                    mt: "1px",
                    textAlign: "center",
                  }}
                >
                  <CircularProgress
                    sx={{ ml: "-5px" }}
                    size={23}
                    color="inherit"
                  />
                </Box>
              ) : (
                "SignIn"
              )}
            </Button>
          </Stack>
        </form>
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

export default SignIn;
