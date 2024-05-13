// import ProfileIcon from "../assets/ProfileIcon.svg";
// import ResultIcon from "../assets/ResultIcon.svg";
// import PlacementIcon from "../assets/PlacementIcon.svg";
// import EventsIcon from "../assets/EventsIcon.svg";
// import CircularIcon from "../assets/CircularIcon.svg";
// import ExamIcon from "../assets/ExamIcon.svg";
// import HelpIcon from "../assets/HelpIcon.svg";
// import SettingIcon from "../assets/SettingIcon.svg";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventIcon from "@mui/icons-material/Event";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import RuleIcon from "@mui/icons-material/Rule";

export const sideBarNavLinksForStudent = [
	{
		link: "profile",
		label: "Profile",
		icon: <AccountCircleIcon />,
	},
	{
		link: "result",
		label: "Result",
		icon: <AssessmentIcon />,
	},
	{
		link: "assignments",
		label: "Assignments",
		icon: <AssignmentIcon />,
	},
	{
		link: "circulars",
		label: "Circulars",
		icon: <DescriptionIcon />,
	},
	{
		link: "events",
		label: "Events",
		icon: <EventIcon />,
	},
	{
		link: "exam",
		label: "Exam",
		icon: <MenuBookIcon />,
	},
];

export const sideBarNavLinksForAdmin = [
	{
		link: "profile",
		label: "Profile",
		icon: <AccountCircleIcon />,
	},
	// {
	//   link: "result",
	//   label: "Result",
	//   icon: <AssessmentIcon />,
	// },
	{
		link: "assignments",
		label: "Assignments",
		icon: <AssignmentIcon />,
	},
	{
		link: "circulars",
		label: "Circulars",
		icon: <DescriptionIcon />,
	},
	{
		link: "events",
		label: "Events",
		icon: <EventIcon />,
	},
	// {
	//   link: "exam",
	//   label: "Exam",
	//   icon: <MenuBookIcon />,
	// },
	{
		link: "requests",
		label: "Requests",
		icon: <RuleIcon />,
	},
];
export const sideBarNavLinksForFaculty = [
	{
		link: "profile",
		label: "Profile",
		icon: <AccountCircleIcon />,
	},
	{
		link: "result",
		label: "Result",
		icon: <AssessmentIcon />,
	},
	{
		link: "assignments",
		label: "Assignments",
		icon: <AssignmentIcon />,
	},
	{
		link: "circulars",
		label: "Circulars",
		icon: <DescriptionIcon />,
	},
	{
		link: "events",
		label: "Events",
		icon: <EventIcon />,
	},
	{
		link: "exam",
		label: "Exam",
		icon: <MenuBookIcon />,
	},
];

export const sideBarExtraNavLinks = [
	{
		link: "help",
		label: "Help",
		icon: <HelpIcon />,
	},
	{
		link: "setting",
		label: "Settings",
		icon: <SettingsIcon />,
	},
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export const allowedUsers = ["admin", "faculty", "student"];

export const sideBarNavLinksForNotAuthorized = [
	{
		link: "login/admin",
		label: "Admin Login",
		icon: <AdminPanelSettingsIcon />,
	},
	{
		link: "login/faculty",
		label: "Faculty Login",
		icon: <PersonIcon />,
	},
	{
		link: "login/student",
		label: "Student Login",
		icon: <PersonIcon />,
	},
];
