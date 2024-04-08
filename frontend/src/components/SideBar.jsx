import "./SideBar.scss";
import dashBoardIcon from "../assets/my_result.svg";
import { NavLink } from "react-router-dom";

import { sideBarNavLinks } from "../constant/constatnt.jsx";
import { sideBarExtraNavLinks } from "../constant/constatnt.jsx";

export default function SideBar({ isSideBarOpen }) {
	return (
		<div className={`sideBar ${isSideBarOpen ? "sideBarOpen" : ""}`}>
			<ul className="sideBarLinksWrapper">
				<div className="sidebarUpperLinks">
					{sideBarNavLinks.map(({ link, label, svgIcon }) => (
						<NavLink
							key={link}
							to={link}
							className={({ isActive }) =>
								isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
							}
						>
							<img className="sideBarIcon" src={svgIcon} alt="" />
							<span className="sideBarLinkName">{label}</span>
						</NavLink>
					))}
				</div>
				<div className="sidebarLowerLinks">
					{sideBarExtraNavLinks.map(({ link, label, svgIcon }) => (
						<NavLink
							key={link}
							to={link}
							className={({ isActive }) =>
								isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
							}
						>
							<img className="sideBarIcon" src={svgIcon} alt="" />
							<span className="sideBarLinkName">{label}</span>
						</NavLink>
					))}
				</div>
			</ul>
		</div>
	);
}
