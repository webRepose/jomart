import { useTranslation } from "react-i18next";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/home/home.module.scss";

const Home = () => {
  const [t] = useTranslation();
  document.title = "Jomart jurek | " + t("Home");
  return (
    <main>
      <Section>
        <div className={Style.home}>
          <h1>Главная</h1>
          <img height={400} src="../img/home/home.jpg" alt="home" />
        </div>
      </Section>
    </main>
  );
};

export default Home;
