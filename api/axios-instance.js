import axios from "axios";

const axiosAdmin = axios.create({
	baseURL: "",
	headers: {
		"X-Custom-Header": typeof window !== "undefined" ? localStorage.getItem("token") : "",
	},
});

export default axiosAdmin;
