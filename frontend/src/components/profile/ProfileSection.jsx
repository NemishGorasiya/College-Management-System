import ServiceSubTitle from "../ServiceSubTitle";
import "./ProfileSection.scss";

import Loader from "react-js-loader";
export default function ProfileSection({
	serviceSubTitle,
	profileDetails,
	isLoading,
}) {
	return (
		<div className="profileSection">
			<ServiceSubTitle serviceSubTitle={serviceSubTitle} />
			{isLoading ? (
				<div className="loaderWrapper" style={{ display: "flex" }}>
					<Loader type="spinner-default" bgColor="#0000FF" size="60" />
				</div>
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
