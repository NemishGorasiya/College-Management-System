import Content from "./Content";
import PhotoSwiper from "./PhotoSwiper";
import "./HomePage.scss";

export default function HomePage() {
	return (
		<div style={{ overflow: "auto" }} className="h-[100vh] homePage">
			<PhotoSwiper />
			<Content />
		</div>
	);
}
