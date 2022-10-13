import Cookies from "js-cookie";

import axios from "../api/axios-instance";

const useRefreshToken = () => {
	const refresh = async () => {
		const response = await axios.post(
			"/admin/refreshToken",
			{},
			{
				headers: { authorization: `Bearer ${Cookies.get("refreshToken")}` },
			},
		);

		return response.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
