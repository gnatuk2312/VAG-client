import axiosAdmin from "./axios-instance";

export async function fetchRequest() {
	try {
		const response = await axiosAdmin.get("posts");
		return response;
	} catch (error) {
		throw error;
	}
}
