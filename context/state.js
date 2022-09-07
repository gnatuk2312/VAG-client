import { createContext, useEffect, useReducer } from "react";
import reducer, { SET_ADMIN_LOGGED_IN, SET_ADMIN_LOGGED_OUT } from "./reducer";

const initialState = {
	adminToken:
		typeof window !== "undefined" && localStorage.getItem("token")
			? localStorage.getItem("token")
			: "",
	adminLoggedIn: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		localStorage.setItem("token", state.adminToken);
	}, [state]);

	const setAdminLoggedIn = (token) => {
		dispatch({ type: SET_ADMIN_LOGGED_IN, payload: token });
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
