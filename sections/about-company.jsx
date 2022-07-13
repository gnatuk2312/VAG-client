import Container from "../components/container";
import Logo from "../components/logo";

const AboutCompany = () => (
  <section className="about-company">
    <Container>
      <div className="about-company__header">
        <Logo />
        <h3 className="about-company__title">
          комп&apos;ютерна діагностика та ремонт автоелектрики легкових автомобілів <br />
          <span className="about-company__text_green"> у тернополі</span>
        </h3>
      </div>
      <div className="about-company__body">
        <p className="about-company__subtitle">Що ви можете очікувати?</p>
        <div className="about-company__text-wrapper">
          <p className="about-company__text">
            ПРИВІТ, ми маленька СТО, яка займається ремонтом автоелекрики у авто VAG групи.
          </p>
          <p className="about-company__text">
            Ми знаємо, що на твоїй машині давненько горить
            <span className="about-company__text_green"> Check</span>, тому ми з радістю проведемо
            комп&apos;ютерну діагностику та відремонтуємо всі несправності, які пов&apos;язані з
            автоелекрикою.
          </p>
        </div>
        <div className="about-company__social">
          <span>S:</span>
          <ul>
            <li className="about-company__social-item">
              <a
                href="https://www.instagram.com/slavek_grabovskiy"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li className="about-company__social-item">
              <a href="https://uk-ua.facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li className="about-company__social-item">
              <a
                href="https://www.youtube.com/channel/UCfO-su5F0y7n1ew39LgmoGg"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </li>
            <li className="about-company__social-item">
              <a href="https://vm.tiktok.com/ZMNPKwj98" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </section>
);

export default AboutCompany;
