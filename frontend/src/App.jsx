import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile.jsx";
import Result from "./components/Result.jsx";
import Placement from "./components/Placement.jsx";
import Events from "./components/Events.jsx";
import Circulars from "./components/Circulars.jsx";
import Exam from "./components/Exam.jsx";
import HomePage from "./pages/HomePage.jsx";
import Help from "./components/Help.jsx";
import Setting from "./components/Setting.jsx";
import Assignments from "./components/Assignments.jsx";
// import { handleStudentLogin } from "./services/Services.jsx";

function App() {
	// handleStudentLogin();
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
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
					path: "/placement",
					element: <Placement />,
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
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
