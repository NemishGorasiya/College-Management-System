import "./SideBar.scss";
import { NavLink } from "react-router-dom";

import { sideBarNavLinksForStudent } from "../constant/constant.jsx";
import { sideBarNavLinksForFaculty } from "../constant/constant.jsx";
import { sideBarNavLinksForAdmin } from "../constant/constant.jsx";
import { sideBarNavLinksForNotAuthorized } from "../constant/constant.jsx";
import { sideBarExtraNavLinks } from "../constant/constant.jsx";
// import { loginPageNavLinks } from "../constant/constant.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { checkIsAuthenticated } from "../utils/utilityFunctions.js";

export default function SideBar({ isSideBarOpen }) {
  const { userType } = useContext(AuthContext);
  const isAuthenticated = checkIsAuthenticated(userType);
  let sideBarNavLinks;
  switch (userType) {
    case "student":
      sideBarNavLinks = sideBarNavLinksForStudent;
      break;
    case "faculty":
      sideBarNavLinks = sideBarNavLinksForFaculty;
      break;
    case "admin":
      sideBarNavLinks = sideBarNavLinksForAdmin;
      break;
    default:
      break;
  }

  return (
    <div className={`sideBar ${isSideBarOpen ? "sideBarOpen" : ""}`}>
      <ul className="sideBarLinksWrapper">
        <div className="sidebarUpperLinks">
          {(isAuthenticated
            ? sideBarNavLinks
            : sideBarNavLinksForNotAuthorized
          ).map(({ link, label, icon }) => (
            <NavLink
              key={link}
              to={`/${link}`}
              className={({ isActive }) =>
                isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
              }
            >
              <span className="sideBarIcon">{icon}</span>
              <span className="sideBarLinkName">{label}</span>
            </NavLink>
          ))}
        </div>
        {isAuthenticated && (
          <div className="sidebarLowerLinks">
            {sideBarExtraNavLinks.map(({ link, label, icon }) => (
              <NavLink
                key={link}
                to={link}
                className={({ isActive }) =>
                  isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
                }
              >
                <span className="sideBarIcon">{icon}</span>
                <span className="sideBarLinkName">{label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}
