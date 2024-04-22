import { allowedUsers } from "../constant/constant";

export const formatDate = (date) => {
	if (date === "" || date === undefined) {
		return "";
	}
	const dateToFormat = new Date(date);
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(dateToFormat);
	return formattedDate;
};
export const DateToTime = (date) => {
	const dateToFormat = new Date(date);
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	}).format(dateToFormat);
	return formattedDate;
};

export const convertToISO = (dateString) => {
	const date = new Date(dateString);
	return date.toISOString();
};

export const checkIsAuthenticated = (currUserType) => {
	const flag = allowedUsers.some((userType) => {
		return userType === currUserType;
	});
	return flag;
};

export const handleFallBackImage = (event, fallBackImage) => {
	event.target.src = fallBackImage;
};
