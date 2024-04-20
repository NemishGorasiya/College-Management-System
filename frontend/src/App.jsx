import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile.jsx";
import Result from "./components/Result.jsx";
import Placement from "./components/Placement.jsx";
import Events from "./components/Events.jsx";
import Circulars from "./components/Circulars.jsx";
import Exam from "./components/Exam.jsx";
import Layout from "./pages/Layout.jsx";
import Help from "./components/Help.jsx";
import Setting from "./components/Setting.jsx";
import Assignments from "./components/Assignments.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import CreateDepartment from "./components/CreateDepartment.jsx";
import { allowedUsers } from "./constant/constant.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Requests from "./components/Requests.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/result",
					element: <Result />,
				},
				{
					path: "/assignments",
					element: <Assignments />,
				},

				{
					path: "/events",
					element: <Events />,
				},
				{
					path: "/circulars",
					element: <Circulars />,
				},
				{
					path: "/exam",
					element: <Exam />,
				},
				{
					path: "/help",
					element: <Help />,
				},
				{
					path: "/setting",
					element: <Setting />,
				},
				{
					path: "/requests",
					element: <Requests />,
				},
				{
					path: "/register",
					element: <RegistrationPage />,
				},
			],
		},
		{
			path: "/login",
			element: <Layout />,
			children: allowedUsers.map((userType) => ({
				path: userType,
				element: <LoginPage userType={userType} />,
			})),
		},
	]);

	return (
		<>
			<AuthContextProvider>
				<Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
				<RouterProvider router={router} />
			</AuthContextProvider>
		</>
	);
}

export default App;
