import React from 'react'
import "./TopBar.css"
import Button from '../UI/Button'
import ldceLogo from "../assets/ldce_logo.png"

export default function TopBar() {
  return (
    <div className='topBar'>
      <div className="topBarLeft">
        <img className='logo' src={ldceLogo} alt="" />
        <h2 className='collegeName'>L.D. College of Engineering</h2>
      </div>
      <div className="topBarRight">
        <Button>Notification</Button>
        <Button textonly>LogOut</Button>
      </div>
    </div>
  )
}
