import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import AdminInput from "../../../components/admin/input";
import { createClient } from "../../../api/clients";

const AdminNewClient = () => {
  const [name, setName] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("380");
  const [carModel, setCarModel] = useState("");
  const [email, setEmail] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataNewClient = { name, carBrand, phoneNumber, carModel, email, licensePlate };

    const pattern = /^[a-z]+\s[a-z]+$/i;

    if (pattern.test(name)) {
      createClient(dataNewClient)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Клієнт успішно створений!");
            setTimeout(() => Router.push("/admin/clients"), 500);
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

    toast.error('Поле "Імʼя та Фамілія" є обовʼязкові! Будь-ласка, заповніть їх.');
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
            <AdminInput
              label="Телефон"
              value={phoneNumber}
              onChange={setPhoneNumber}
              isPhoneNumber
            />
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
