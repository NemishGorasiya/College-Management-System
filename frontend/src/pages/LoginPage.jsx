import TopBar from "../components/TopBar";
import "./LoginPage.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { allowedUsers } from "../constant/constant";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");
  if (!allowedUsers.includes(userType)) {
    console.error("Invalid user type:", userType);
    return null;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;
    console.log(data);
    // loginStudent({ data });
    // handleLogin({ userType, data });
  };
  return (
    <div className="loginPage">
      <TopBar />
      <div className="contentWrapper">
        <div className="formContainer">
          <h2>{userType} Login</h2>
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="formControls">
              <FormControl variant="outlined" className="formControl">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput id="username" name="username" label="Username" />
              </FormControl>
              <FormControl variant="outlined" className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
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
                />
              </FormControl>
              <Stack className="submitBtnWrapper">
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </Stack>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
