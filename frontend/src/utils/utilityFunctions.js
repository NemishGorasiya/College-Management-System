export const formatDate = (date) => {
	const dateToFormat = new Date(date);
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(dateToFormat);
	return formattedDate;
};
