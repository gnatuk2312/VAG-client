import Button from "../components/button";
import Container from "../components/container";

const Header = () => (
  <header className="header">
    <Container>
      <div className="header__top">
        <h1 className="header__title">
          автоелектрик <br />
          <span className="header__title_green">vag group</span>
        </h1>
        <div className="header__subtitle-wrapper">
          <h2 className="header__subtitle">
            діагностика та ремонт
            <br /> автомобілів
          </h2>
          <Button className="header__button-top">записатись на діагностику</Button>
        </div>
      </div>
      <div className="header__bottom">
        <a href="tel:+380679992655" className="header__phone">
          +38 067 999 26 55
        </a>
        <address className="header__address">м. Тернопіль | Бродівська 59</address>
        <Button className="header__button-bottom">записатись на діагностику</Button>
      </div>
    </Container>
  </header>
);

export default Header;
