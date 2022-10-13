import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

const createVisit = async (requestBody) => {
	try {
		const response = await axiosPrivate.post("/visits", requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getVisitByID = async (id) => {
	try {
		const response = await axiosPrivate.get(`/visits/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const deleteVisitByID = async (id) => {
	try {
		const response = await axiosPrivate.delete(`/visits/${id}`);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const updateVisitByID = async (id, requestBody) => {
	try {
		const response = await axiosPrivate.put(`/visits/${id}`, requestBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export { createVisit, getVisitByID, deleteVisitByID, updateVisitByID };
