import { useEffect, useState } from "react";
import headerLogo from "../../assets/ldce_logo.png";
import CTAButton from "./CTAButton.jsx";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom";

export default function HPHeader() {
	const [isSticky, setIsSticky] = useState(false);

	const navigate = useNavigate();

	const liData = [
		{
			name: "Home",
			link: "home",
		},
		{
			name: "About",
			link: "about",
		},
		{
			name: "Achievements",
			link: "achievements",
		},
		{
			name: "Placements",
			link: "placements",
		},
		{
			name: "Locate Us",
			link: "locate-us",
		},
		{
			name: "Team",
			link: "team",
		},
	];

	const handleSetActive = (to) => {
		console.log("this was called", to);
	};

	useEffect(() => {
		const stickyHandler = () => {
			if (window.scrollY > 0) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", stickyHandler);

		return () => {
			window.removeEventListener("scroll", stickyHandler);
		};
	}, []);

	return (
		<header
			className={
				(isSticky === true
					? " border-b border-opacity-50 border-purple-300 shadown-md "
					: " shadow-none ") +
				" sticky top-0 flex flex-row items-center justify-center gap-5 p-3 bg-purple-200 z-[999] "
			}
		>
			<div
				className="cursor-pointer flex items-center justify-center gap-5"
				onClick={() => {
					navigate("/home");
				}}
			>
				<img
					src={headerLogo}
					className="w-[10%] hover:scale-105 transition-all"
				/>
				<h1 className="text-2xl font-bold text-purple-800">
					L.D. College of Engineering
				</h1>
			</div>
			<ul className="nav-buttons flex justify-center flex-grow gap-5">
				{liData.map((item, index) => {
					if (item.name === "Team") {
						return (
							<li key={index} className="hover:text-purple-500 transition-all">
								<NavLink
									to={`/home/${item.link}`}
									activeClass="text-purple-500 transition-all"
									onSetActive={handleSetActive}
								>
									Team
								</NavLink>
							</li>
						);
					} else if (item.name === "Home") {
						return (
							<li key={index} className="hover:text-purple-500 transition-all">
								<NavLink
									to={`/home`}
									activeClass="text-purple-500 transition-all"
									onSetActive={handleSetActive}
								>
									Home
								</NavLink>
							</li>
						);
					}

					return (
						<li key={index} className="hover:text-purple-500 transition-all">
							<a href={`#${item.link}`}>{item.name}</a>
						</li>
					);
				})}
			</ul>
			<div className="flex items-center justify-center flex-1">
				<CTAButton />
			</div>
		</header>
	);
}
