import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
	const [isEmpty, setEmpty] = useState(false);
	const [isPhoneError, setPhoneError] = useState(false);
	const [isEmailError, setEmailError] = useState(false);

	const [inputValid, setInputValid] = useState(false);

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case "isEmpty":
					value ? setEmpty(false) : setEmpty(true);
					break;

				case "isPhoneError":
					const num = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
					num.test(value) ? setPhoneError(false) : setPhoneError(true);
					break;

				case "isEmailError":
					const mail = /\S+@\S+\.\S+/;
					mail.test(value) ? setEmailError(false) : setEmailError(true);
					break;

				default:
					return;
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (isEmpty || isPhoneError || isEmailError) {
			setInputValid(false);
		} else {
			setInputValid(true);
		}
	}, [isEmpty, isPhoneError, isEmailError]);

	return {
		isEmpty,
		isPhoneError,
		isEmailError,
		inputValid,
	};
};
