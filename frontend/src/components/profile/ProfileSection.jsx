import ServiceSubTitle from "../ServiceSubTitle";
import "./ProfileSection.scss";
export default function ProfileSection({ serviceSubTitle, profileDetails }) {
	return (
		<div className="profileSection">
			<ServiceSubTitle serviceSubTitle={serviceSubTitle} />
			<div className="profileDetailsWrapper">
				{profileDetails.map(({ label, value }, idx) => (
					<div key={idx} className="profileDetail">
						<div className="profileDetailTitle">{label}</div>
						<div className="profileDetailDescription">{value}</div>
					</div>
				))}
			</div>
		</div>
	);
}
