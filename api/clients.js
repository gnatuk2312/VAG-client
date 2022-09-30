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

const updateClientByID = async (id, requestBody) => {
	try {
		const response = await axios.put(`/clients/${id}`, requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const deleteClientByID = async (id) => {
	try {
		const response = await axios.delete(`/clients/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getAllClients = async (limit, page, field, value) => {
	try {
		const response = await axios.get(
			`/clients?limit=${limit}&page=${page}&filter=${field}|${value}`,
		);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getAllClientVisits = async (clientID, limit, page = 1) => {
	try {
		const response = await axios.get(`/clients/${clientID}/visits/?limit=${limit}&page=${page}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export {
	createClient,
	getClientByID,
	updateClientByID,
	deleteClientByID,
	getAllClients,
	getAllClientVisits,
};
