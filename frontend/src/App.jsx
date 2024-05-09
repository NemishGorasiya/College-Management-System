import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Assignments from "./components/Assignments.jsx";
import Circulars from "./components/Circulars.jsx";
import Events from "./components/Events.jsx";
import Exam from "./components/Exam.jsx";
import Help from "./components/Help.jsx";
import Profile from "./components/Profile.jsx";
import Requests from "./components/Requests.jsx";
import Result from "./components/Result.jsx";
import Setting from "./components/Setting.jsx";
import HomePage from "./components/home-page/HomePage.jsx";
import Team from "./components/home-page/Team.jsx";
import { allowedUsers } from "./constant/constant.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import HomePageLayout from "./pages/HomePageLayout.jsx";
import Layout from "./pages/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AssignmentSubmissions from "./components/assignments/AssignmentSubmissions.jsx";

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
					path: "/assignments/:assignmentsId",
					element: <AssignmentSubmissions />,
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
		{
			path: "/home",
			element: <HomePageLayout />,
			children: [
				{
					path: "/home/",
					element: <HomePage />,
				},
				{
					path: "/home/team",
					element: <Team />,
				},
			],
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
