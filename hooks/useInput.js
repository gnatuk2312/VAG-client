import { useState } from "react";

import { useValidation } from "./useValidation";

export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setDirty] = useState(false);
	const valid = useValidation(value, validations);

	const onChange = (event) => setValue(event.target.value);
	const onBlur = () => setDirty(true);

	return {
		value,
		setValue,
		setDirty,
		onChange,
		onBlur,
		isDirty,
		...valid,
	};
};
