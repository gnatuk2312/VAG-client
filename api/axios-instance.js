import axios from "axios";

const axiosAdmin = axios.create({
	baseURL: process.env.SERVER_URL,
	headers: {
		"X-Custom-Header": typeof window !== "undefined" ? localStorage.getItem("token") : "",
	},
});

export default axiosAdmin;
