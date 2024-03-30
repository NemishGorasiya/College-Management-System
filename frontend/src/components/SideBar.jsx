import React from 'react'
import "./SideBar.css"
import dashBoardIcon from "../assets/dashboard_icon.png";

export default function SideBar() {
  return (
    <div className='sideBar'>
      <ul>
        <li className='sideBarNavLink'>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span>DashBoard</span>
        </li>
        <li className='sideBarNavLink'>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span>DashBoard</span>
        </li>
        <li className='sideBarNavLink'>
            <img className='sideBarIcon' src={dashBoardIcon} alt="" />
            <span>DashBoard</span>
        </li>
        <li></li>
      </ul>
    </div>
  )
}
