import axios from "axios";

console.log(process.env.SERVER_URL);
const axiosAdmin = axios.create({
	baseURL: process.env.SERVER_URL,
	headers: {
		"X-Custom-Header": typeof window !== "undefined" ? localStorage.getItem("token") : "",
	},
});

export default axiosAdmin;
