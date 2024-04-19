import "./Layout.scss";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [userType, setUserType] = useLocalStorage();
  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };
  return (
    <div className="Layout">
      <TopBar handleHamBurgerClick={handleHamBurgerClick} />
      <div className="contentWrapper">
        <SideBar userType={userType} isSideBarOpen={isSideBarOpen} />
        <div className="mainContent">
          <Outlet userType={userType} />
        </div>
      </div>
    </div>
  );
}
