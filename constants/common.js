export const adminHours = [
	"9:00",
	"9:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
];

export const searchClientsDropDownConfig = [
	{ displayName: "Ім'я", field: "name" },
	{ displayName: "Телефон", field: "phone" },
	{ displayName: "Марка авто", field: "carBrand" },
	{ displayName: "Модель авто", field: "carModel" },
	{ displayName: "Номерний знак", field: "licensePlate" },
];

export const isWeekday = (date) => {
	const day = date.getDay();
	return day !== 0 && day !== 6;
};
