import axios from "./axios-instance";

const createClient = async (dataNewClient) => {
	try {
		const { name, phoneNumber: phone, carBrand, carModel, licensePlate, email } = dataNewClient;
		const reqBody = { name, phone, carBrand, carModel, licensePlate, email };
		const response = await axios.post("/clients", reqBody);
		return response;
	} catch (err) {
		const error = new Error(err?.response?.data);
		error.code = err?.response?.status;
		throw error;
	}
};

export { createClient };
