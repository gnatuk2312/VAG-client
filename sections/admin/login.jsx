import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { GlobalContext } from "../../context/state";
import AdminInput from "../../components/admin/input";
import Container from "../../components/container";
import AdminTitle from "../../components/admin/admin-title";
import Loading from "../../components/admin/loading";
import { getAdminStatus, signinAdmin } from "../../api/admin";

const AdminLogin = () => {
  const { setAdminLoggedIn } = useContext(GlobalContext);

  const [login, setLogin] = useState("VagAdministrator");
  const [password, setPassword] = useState("ternKsae139!");
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    getAdminStatus()
      .then((resp) => {
        if (resp.status === 204) {
          setAdminLoggedIn();
          Router.back();
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);
    signinAdmin(login, password)
      .then((resp) => {
        if (resp.status === 200) {
          setAdminLoggedIn();
          Cookies.set("refreshToken", resp.data.refreshToken);
          Cookies.set("accessToken", resp.data.accessToken);
        } else toast.error(`Щось не так з вашим запитом. Деталі: ${resp?.message}`);
      })
      .catch((err) => {
        if (err?.code === 401) {
          return toast.error("Невірний логін або пароль");
        }
        toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
      })
      .finally(() => setIsPending(false));
  };

  if (loading) {
    return <Loading className="admin-login__loading" isVisible={loading} />;
  }

  return (
    <>
      <section className="admin-login">
        <Container>
          <AdminTitle title="Введіть Логін і Пароль, щоб увійти як адмін" />
          <form className="admin-login__form">
            <AdminInput
              label="Логін"
              className="admin-login__input"
              value={login}
              onChange={setLogin}
            />
            <AdminInput
              label="Пароль"
              className="admin-login__input"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <button type="submit" onClick={handleSubmit} className="admin-login__submit button">
              Увійти
            </button>
          </form>
        </Container>
        <Loading className="admin-login__loading" isVisible={isPending} />
      </section>
      <Toaster position="top-center" />
    </>
  );
};

export default AdminLogin;
