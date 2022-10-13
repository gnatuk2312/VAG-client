export const SET_ADMIN_LOGGED_IN = "SET_ADMIN_LOGGED_IN";
export const SET_ADMIN_LOGGED_OUT = "SET_ADMIN_LOGGED_OUT";

export default (state, action) => {
	switch (action.type) {
		case "SET_ADMIN_LOGGED_IN":
			return {
				...state,
				adminLoggedIn: true,
			};

		case "SET_ADMIN_LOGGED_OUT":
			return {
				...state,
				adminLoggedIn: false,
			};

		default:
			return state;
	}
};
