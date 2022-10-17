import { createContext, useReducer } from "react";
import reducer, { SET_ADMIN_LOGGED_IN, SET_ADMIN_LOGGED_OUT } from "./reducer";

const initialState = {
	adminLoggedIn: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setAdminLoggedIn = () => {
		dispatch({ type: SET_ADMIN_LOGGED_IN });
	};

	const setAdminLoggedOut = () => {
		dispatch({ type: SET_ADMIN_LOGGED_OUT });
	};

	return (
		<GlobalContext.Provider
			value={{
				adminToken: state.adminToken,
				adminLoggedIn: state.adminLoggedIn,
				setAdminLoggedIn,
				setAdminLoggedOut,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
