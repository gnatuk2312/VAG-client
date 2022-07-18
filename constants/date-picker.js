export const availableHours = ["9:00", "10:00", "11:00", "12:00", "14:00", "15:00"];

export const isWeekday = (date) => {
	const day = date.getDay();
	return day !== 0 && day !== 6;
};
