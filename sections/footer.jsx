import { useEffect, useState } from "react";

import Container from "../components/container";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    setCurrentDate(new Date());
    setCurrentYear(currentDate.getFullYear());
  }, []);

  return (
    <footer className="footer">
      <Container className="footer__container">
        <p className="footer__copyright footer__text">
          © Автоелектрик VAG group {currentYear}. All rights reserved.
        </p>
        <div className="footer__relations">
          <p className="footer__developed footer__text">Developed by Hnat Liashenko</p>
          <p className="footer__text">GRAB’s PROPERTY #1</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
