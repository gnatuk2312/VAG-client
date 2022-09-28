import axios from "./axios-instance";

const createVisit = async (requestBody) => {
	try {
		const response = await axios.post("/visits", requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getVisitByID = async (id) => {
	try {
		const response = await axios.get(`/visits/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const deleteVisitByID = async (id) => {
	try {
		const response = await axios.delete(`/visits/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export { createVisit, getVisitByID, deleteVisitByID };
