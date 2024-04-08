import "./TopBar.scss";
import Button from "../UI/Button";
import ldceLogo from "../assets/ldce_logo.png";
import notificationBell from "../assets/notificationBell.png";
import BurgerMenuIcon from "../assets/BurgerMenuIcon.svg";

export default function TopBar({ handleHamBurgerClick }) {
	return (
		<div className="topBar">
			<div className="topBarLeft">
				<img
					className="burgerMenuIcon"
					src={BurgerMenuIcon}
					onClick={handleHamBurgerClick}
					alt="BurgerIcon"
				/>
				<img className="logo" src={ldceLogo} alt="ldceLogo" />
				<span className="collegeName">L.D. College of Engineering</span>
			</div>
			<div className="topBarRight">
				<Button className="notificationBell">
					<img src={notificationBell} alt="" />
				</Button>
				<Button textonly>Log Out</Button>
			</div>
		</div>
	);
}
