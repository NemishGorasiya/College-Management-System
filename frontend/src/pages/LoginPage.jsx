import TopBar from "../components/TopBar";
import "./LoginPage.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { allowedUsers } from "../constant/constant";
import { loginUser } from "../services/services";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const LoginPage = ({ userType }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { updateUserType } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const fd = new FormData(event.target);
		const data = Object.fromEntries(fd.entries());
		try {
			const res = await loginUser({ userType, data });
			if (res) {
				toast.success("User loggedIn successfully");
				navigate("/profile");
				updateUserType(userType);
			} else {
				toast.error("Invalid credentials");
			}
		} catch (error) {
			toast.error("Invalid credentials");
		}
	};
	return (
		<div className="loginPage">
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
	);
};

export default LoginPage;
