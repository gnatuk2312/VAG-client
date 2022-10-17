import Cookies from "js-cookie";

import axios from "../api/axios-instance";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();

	axios.interceptors.request.use(
		(config) => {
			const accessToken = Cookies.get("accessToken");

			if (!config.headers.authorization && accessToken) {
				config.headers.authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => Promise.reject(error),
	);

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const prevRequest = error?.config;
			if (error?.response?.status === 476 && !prevRequest?.sent) {
				prevRequest.sent === true;
				const newAccessToken = await refresh();
				Cookies.set("accessToken", newAccessToken);
				prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
				return axios(prevRequest);
			}
			Cookies.remove("refreshToken");
			Cookies.remove("accessToken");
			return Promise.reject(error);
		},
	);

	return axios;
};

export default useAxiosPrivate;
