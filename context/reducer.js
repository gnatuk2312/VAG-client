export const SET_ADMIN_LOGGED_IN = "SET_ADMIN_LOGGED_IN";

export default (state, action) => {
	switch (action.type) {
		case "SET_ADMIN_LOGGED_IN":
			return {
				...state,
				adminLoggedIn: true,
				adminToken: action.payload,
			};

		default:
			return state;
	}
};
