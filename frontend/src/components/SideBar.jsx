import "./SideBar.scss"
import dashBoardIcon from "../assets/my_result.svg";
import { NavLink } from "react-router-dom";

const sideBarNavLinks = ["profile","result","placement","events","circulars","exam"]

export default function SideBar() {
  return (
    <div className='sideBar'>
      <ul className='sideBarLinksWrapper'>
        <div className="sidebarUpperLinks">
          {
            sideBarNavLinks.map((link)=><NavLink key={link} to={link} className={({ isActive }) =>
            isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
          }>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span className="sideBarLinkName">{link}</span>
        </NavLink>)
          }
        </div>
        <div className="sidebarLowerLinks">
        <NavLink to="help" className={({ isActive }) =>
            isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
          }>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span className="sideBarLinkName">Help</span>
        </NavLink>
        <NavLink to="setting"  className={({ isActive }) =>
            isActive ? "sideBarNavLink activeLink" : "sideBarNavLink"
          }>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span className="sideBarLinkName">Setting</span>
        </NavLink>
        </div>
      </ul>
    </div>
  )
}
