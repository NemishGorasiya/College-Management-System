import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Layout from "../pages/Layout";
import { checkIsAuthenticated } from "../utils/utilityFunctions";

const ProtectedRoute = () => {
	const [userType, setUserType] = useLocalStorage("userType", null);

	const isAuthenticated = checkIsAuthenticated(userType);

	return isAuthenticated ? (
		<Layout userInfo={userType} />
	) : (
		<Navigate to="/login/student" />
	);
};

export default ProtectedRoute;
