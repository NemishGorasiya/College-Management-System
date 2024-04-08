import "./HomePage.scss";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const handleHamBurgerClick = () => {
		setIsSideBarOpen((prevState) => !prevState);
	};
	return (
		<div className="homePage">
			<TopBar handleHamBurgerClick={handleHamBurgerClick} />
			<div className="contentWrapper">
				<SideBar isSideBarOpen={isSideBarOpen} />
				<div className="mainContent">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
