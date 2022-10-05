import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import AdminInput from "../../../components/admin/input";
import { createClient } from "../../../api/clients";
import removeEmptyKeysInObject from "../../../helpers/remove-empty-keys-in-object";

const AdminNewClient = () => {
  const [name, setName] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [phone, setPhone] = useState("380");
  const [carModel, setCarModel] = useState("");
  const [email, setEmail] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const clearForm = () => {
    setName("");
    setPhone("380");
    setCarModel("");
    setCarBrand("");
    setEmail("");
    setLicensePlate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataNewClient = {
      name,
      carBrand,
      phone,
      carModel,
      email,
      licensePlate: licensePlate.toUpperCase(),
    };

    if (name.trim() !== "") {
      const requestBody = removeEmptyKeysInObject(dataNewClient);

      createClient(requestBody)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Клієнт успішно створений!");
            clearForm();
            return;
          }
          return toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
          );
        })
        .catch((err) => {
          if (err.code === 400)
            return toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
          toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`,
          );
        });
      return;
    }

    toast.error('Поле "Імʼя та Прізвище" є обовʼязкові! Будь-ласка, заповніть їх.');
  };

  return (
    <section className="admin-new-client">
      <div className="admin-new-client__container">
        <div className="admin-new-client__header">
          <AdminTitle title="Новий клієнт" />
          <Link href="/admin/clients" passHref>
            <a className="admin-new-client__redirect-back" href="replace">
              <span />
            </a>
          </Link>
        </div>
        <form className="admin-new-client__form">
          <div className="admin-new-client__inputs-wrapper">
            <AdminInput label="Ім’я Прізвище" value={name} onChange={setName} />
            <AdminInput
              label="Марка авто"
              value={carBrand}
              onChange={setCarBrand}
              dropdown={["Skoda", "Audi", "Wolksvagen", "Seat"]}
            />
            <AdminInput label="Телефон" value={phone} onChange={setPhone} isPhoneNumber />
            <AdminInput label="Модель" value={carModel} onChange={setCarModel} />
            <AdminInput label="Email" value={email} onChange={setEmail} />
            <AdminInput label="Номерний знак" value={licensePlate} onChange={setLicensePlate} />
          </div>
          <button type="submit" onClick={handleSubmit} className="admin-new-client__submit">
            Створити
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminNewClient;
