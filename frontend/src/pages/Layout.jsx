import "./Layout.scss";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout({ userInfo }) {
  const { isAuthenticated, userType } = userInfo || {};
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };
  return (
    <div className="Layout">
      <TopBar handleHamBurgerClick={handleHamBurgerClick} isAuthenticated />
      <div className="contentWrapper">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          userType={userType}
          isAuthenticated={isAuthenticated ?? false}
        />
        <div className="mainContent">
          <Outlet context={userType} />
        </div>
      </div>
    </div>
  );
}
