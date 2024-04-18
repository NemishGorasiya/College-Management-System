import ServiceSubTitle from "../ServiceSubTitle";
import "./ProfileSection.scss";
export default function ProfileSection({
  serviceSubTitle,
  profileDetails,
  isLoading,
}) {
  return (
    <div className="profileSection">
      <ServiceSubTitle serviceSubTitle={serviceSubTitle} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="profileDetailsWrapper">
          {profileDetails.map(
            ({ label, value }, idx) =>
              value && (
                <div key={idx} className="profileDetail">
                  <div className="profileDetailTitle">{label}</div>
                  <div className="profileDetailDescription">{value}</div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
