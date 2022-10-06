import { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";

import { getAppointmentsByDate, createAppointment } from "../api/appointments";
import { clientHours } from "../constants/date-picker";
import { adminHours } from "../constants/common";

const useBookAppointment = (fields, isAdmin) => {
	const [freeHours, setFreeHours] = useState(isAdmin ? [...adminHours] : [...clientHours]);
	const [successModalOpen, setSuccessModalOpen] = useState(false);
	const [date, setDate] = useState(null);
	const [selectedHour, setSelectedHour] = useState("");

	const { email, phone, name } = fields;

	useEffect(() => {
		setDate(new Date());
	}, []);

	useEffect(() => {
		setSelectedHour("");

		if (date) {
			getAppointmentsByDate(moment(date).format("YYYY-MM-DD"))
				.then((resp) => {
					if (resp.status === 200) {
						const { data } = resp;
						const { appointments } = data;
						const newFreeHours = isAdmin ? [...adminHours] : [...clientHours];

						appointments.forEach(({ hour }) => {
							for (let index = 0; index < newFreeHours.length; index += 1) {
								if (newFreeHours[index] === hour) {
									newFreeHours.splice(index, 1);
								}
							}
						});

						setFreeHours(newFreeHours);
						return;
					}

					return toast.error(
						`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
					);
				})
				.catch((err) => {
					toast.error(
						`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`,
					);
				});
		}
	}, [date]);

	const handleSuccessModalClose = () => {
		setDate(new Date());
		setSelectedHour("");
		setFreeHours(isAdmin ? [...adminHours] : [...clientHours]);
		if (!isAdmin) setSuccessModalOpen(false);
		name.setValue("");
		name.setDirty(false);
		phone.setValue("");
		phone.setDirty(false);
		email.setValue("");
		email.setDirty(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (selectedHour === "" || selectedHour === null) {
			setSelectedHour(null);
			return;
		}

		const newAppointment = {
			name: name.value,
			phone: phone.value,
			hour: selectedHour,
			date: moment(date).format("YYYY-MM-DD"),
		};

		if (email.value) newAppointment.email = email.value;

		createAppointment(newAppointment)
			.then((resp) => {
				if (resp.status === 201) {
					if (isAdmin) {
						toast.success("Успішно!");
						handleSuccessModalClose();
					} else {
						setSuccessModalOpen(true);
					}
					return;
				}

				return toast.error(
					`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
				);
			})
			.catch((err) => {
				toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
			});
	};

	return {
		freeHours,
		successModalOpen,
		handleSubmit,
		handleSuccessModalClose,
		date,
		setDate,
		selectedHour,
		setSelectedHour,
	};
};

export default useBookAppointment;
