import ProfileIcon from "../assets/ProfileIcon.svg";
import ResultIcon from "../assets/ResultIcon.svg";
import PlacementIcon from "../assets/PlacementIcon.svg";
import EventsIcon from "../assets/EventsIcon.svg";
import CircularIcon from "../assets/CircularIcon.svg";
import ExamIcon from "../assets/ExamIcon.svg";
import HelpIcon from "../assets/HelpIcon.svg";
import SettingIcon from "../assets/SettingIcon.svg";

export const sideBarNavLinks = [
  {
    link: "profile",
    label: "Profile",
    svgIcon: ProfileIcon,
  },
  {
    link: "result",
    label: "Result",
    svgIcon: ResultIcon,
  },
  {
    link: "assignments",
    label: "Assignments",
    svgIcon: ExamIcon,
  },
  {
    link: "placement",
    label: "Placement",
    svgIcon: PlacementIcon,
  },
  {
    link: "circulars",
    label: "Circulars",
    svgIcon: CircularIcon,
  },
  {
    link: "events",
    label: "Events",
    svgIcon: EventsIcon,
  },
  {
    link: "exam",
    label: "Exam",
    svgIcon: ExamIcon,
  },
];
export const sideBarExtraNavLinks = [
  {
    link: "help",
    label: "Help",
    svgIcon: HelpIcon,
  },
  {
    link: "setting",
    label: "Setting",
    svgIcon: SettingIcon,
  },
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export const allowedUsers = ["admin", "faculty", "student"];

export const loginPageNavLinks = [
  {
    link: "login/admin",
    label: "Admin Login",
    svgIcon: ProfileIcon,
  },
  {
    link: "login/faculty",
    label: "Faculty Login",
    svgIcon: ResultIcon,
  },
  {
    link: "login/student",
    label: "Student Login",
    svgIcon: ResultIcon,
  },
];
