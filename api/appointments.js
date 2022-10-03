import axiosAdmin from "./axios-instance";

async function getAllAppointments(page, limit) {
	try {
		const response = await axiosAdmin.get("/appointments", { params: { page, limit } });
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
}

async function getAppointmentsByDate(date) {
	try {
		const response = await axiosAdmin.get(`/appointments/${date}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
}

async function createAppointment(body) {
	try {
		const response = await axiosAdmin.post("/appointments", body);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
}

export { getAllAppointments, getAppointmentsByDate, createAppointment };
