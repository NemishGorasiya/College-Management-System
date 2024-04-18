import "./TopBar.scss";
import Button from "../UI/Button";
import ldceLogo from "../assets/ldce_logo.png";
import notificationBell from "../assets/notificationBell.png";
import BurgerMenuIcon from "../assets/BurgerMenuIcon.svg";
import toast from "react-hot-toast";
import { logoutUser } from "../services/services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TopBar({ handleHamBurgerClick }) {
  const { updateUserType, changeAuthenticationStatus, isAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        toast.success("User loggedOut successfully");
        updateUserType(null);
        changeAuthenticationStatus(false);
        navigate("/login/student");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
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
      {isAuthenticated && (
        <div className="topBarRight">
          <Button className="notificationBell">
            <img src={notificationBell} alt="" />
          </Button>
          <Button onClick={handleLogout} textonly>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
