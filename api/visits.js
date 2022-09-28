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

export { createVisit };
