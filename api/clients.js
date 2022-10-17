import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

const createClient = async (requestBody) => {
	try {
		const response = await axiosPrivate.post("/clients", requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getClientByID = async (id) => {
	try {
		const response = await axiosPrivate.get(`/clients/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const updateClientByID = async (id, requestBody) => {
	try {
		const response = await axiosPrivate.put(`/clients/${id}`, requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const deleteClientByID = async (id) => {
	try {
		const response = await axiosPrivate.delete(`/clients/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getAllClients = async (limit, page, field, value) => {
	try {
		const response = await axiosPrivate.get(
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
		const response = await axiosPrivate.get(
			`/clients/${clientID}/visits/?limit=${limit}&page=${page}`,
		);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const deleteAllClientVisits = async (clientID) => {
	try {
		await axiosPrivate.delete(`/clients/${clientID}/visits`);
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
	deleteAllClientVisits,
};
