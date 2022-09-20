import axios from "axios";

const axiosAdmin = axios.create({
	baseURL: "https://vag-server.herokuapp.com/api",
	headers: {
		"X-Custom-Header": typeof window !== "undefined" ? localStorage.getItem("token") : "",
	},
});

export default axiosAdmin;
