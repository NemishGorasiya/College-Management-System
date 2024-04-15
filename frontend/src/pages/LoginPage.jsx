import TopBar from "../components/TopBar";
import "./LoginPage.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const LoginPage = () => {
	const handleLogin = (event) => {
		event.preventDefault();
		const fd = new FormData(event.target);
		const acquisitionChannel = fd.getAll("acquisition");
		const data = Object.fromEntries(fd.entries());
		data.acquisition = acquisitionChannel;
		console.log(data);
		loginStudent({ data });
	};
	return (
		<div className="loginPage">
			<TopBar />
			<div className="contentWrapper">
				<div className="formContainer">
					<h2>Admin Login</h2>
					<form className="form" onSubmit={handleLogin}>
						<div className="formControls">
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="username">Username</InputLabel>
								<OutlinedInput id="username" name="username" label="Username" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput id="password" name="password" label="Password" />
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
