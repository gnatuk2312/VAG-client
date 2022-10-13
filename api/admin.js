import axios from "./axios-instance";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

const signinAdmin = async (login, password) => {
	try {
		const response = await axios.post("/admin/signin", { login, password });
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const logoutAdmin = async () => {
	try {
		const response = await axiosPrivate.post("/admin/logout", {});
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

const getAdminStatus = async () => {
	try {
		const response = await axiosPrivate.get("/admin/status");
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export { signinAdmin, logoutAdmin, getAdminStatus };
