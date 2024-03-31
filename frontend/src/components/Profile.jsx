import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg"
import ProfileSection from "./profile/ProfileSection";

export default function Profile() {
  return (
    <div className="profileContainer">
      <ServiceTitle serviceTitle="Personal details" />
      <div className="profileContentWrapper">
        <img className="profileImage" src={profileImage} alt="" />
        <div className="profileContent">
          <ProfileSection serviceSubTitle="Personal Information" />
          <ProfileSection serviceSubTitle="Academic Information" />
        </div>
      </div>
    </div>
  )
}
