export default function Team() {
	const team = [
		{
			name: "Nemish Gorasiya",
			role: "Frontend Development",
			work:
				"Developed the frontend of the website using React.js, MUI and SCSS. Implemented the routing of the website using React Router and used Axios for fetching data from the backend. Designed the UI of the website and implemented the search functionality for the website.",
		},
		{
			name: "Naineel Soyantar",
			role: "Backend Development",
			work:
				"Developed the backend of the website using Node.js, Express.js, and MongoDB. Implemented the authentication system using Passport and used Session cookies for persistent login. Modelled the database of the website using MongoDB and mongoose ORM.",
		},
		{
			name: "Mansi Sojitra",
			role: "Backend Development",
			work:
				"Developed the backend of the website using Node.js, Express.js, and MongoDB. Optimized the logic for fetching data from the database and implemented the search functionality for the website. Tested the backend routes using Postman and implemented the error handling for the backend.",
		},
	];

	return (
		<div className=" m-[2rem] p-[2rem] rounded-lg bg-white">
			<h3 className="text-[2rem] font-bold text-purple-600">Team</h3>

			<div className="">
				{team.map((member, index) => {
					return (
						<div key={index} className="my-[1rem]">
							<h4 className="text-lg font-semibold text-purple-700">
								{member.name}
							</h4>
							<p className="text-gray-600 font-semibold">{member.role}</p>
							<p className="text-gray-600 text-justify">{member.work}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
