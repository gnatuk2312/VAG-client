import { createContext, useEffect, useReducer } from "react";
import reducer, { SET_ADMIN_LOGGED_IN } from "./reducer";

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

	return (
		<GlobalContext.Provider
			value={{
				adminToken: state.adminToken,
				adminLoggedIn: state.adminLoggedIn,
				setAdminLoggedIn,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
