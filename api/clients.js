import axios from "./axios-instance";

const createClient = async (requestBody) => {
	try {
		const response = await axios.post("/clients", requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getClientByID = async (id) => {
	try {
		const response = await axios.get(`/clients/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export { createClient, getClientByID };
