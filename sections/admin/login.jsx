import { useContext, useState } from "react";

import { GlobalContext } from "../../context/state";
import AdminInput from "../../components/admin/input";
import Container from "../../components/container";
import AdminTitle from "../../components/admin/admin-title";
import Loading from "../../components/admin/loading";

const AdminLogin = () => {
  const { setAdminLoggedIn } = useContext(GlobalContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAdminLoggedIn("TOKEN");
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
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
            value={password}
            onChange={setPassword}
          />
          <button type="submit" onClick={handleSubmit} className="admin-login__submit button">
            Увійти
          </button>
        </form>
      </Container>
      <Loading className="admin-login__loading" isVisible={loading} />
    </section>
  );
};

export default AdminLogin;
