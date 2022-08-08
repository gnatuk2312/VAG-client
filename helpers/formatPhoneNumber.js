export const formatPhoneNumber = (phone) => {
	const myPhone = phone.match(/(\d)/g)?.join(``);
	if (myPhone === undefined) return ``;
	if (myPhone?.length === 12) {
		return myPhone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, `+$1 $2 $3 $4`);
	}

	return myPhone;
};
