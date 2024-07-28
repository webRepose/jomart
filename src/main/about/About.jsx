import { Link } from "react-router-dom";
import Section from "../../UI_kit/Section";
import Social from "../../menu/Social";
import Style from "../../styles/main/about/about.module.scss";
import { useTranslation } from "react-i18next";

const About = () => {
  const [t] = useTranslation();
  document.title = 'Jomart jurek | '+ t("Home");
  return (
    <main>
      <Section>
        <div className={Style.about}>
          <div className={Style.about_block}>
            <h1>{t("About")}</h1>
            <h3>
              {t("A-comp")} <br /> <b>Jomart Jurek</b>
            </h3>
          </div>

          <div className={Style.about_task}>
            <div className={Style.about_task_first}>
              <div>
                <img height={600} src="../img/picture/3.jpg" alt="we are" />
              </div>
              <div>
                <h4>{t("A-task")}</h4>
                <h4>{t("A-we")}</h4>
                <ol>
                  <li>{t("A-we1")}</li>
                  <li>{t("A-we2")}</li>
                  <li>{t("A-we3")}</li>
                  <li>{t("A-we4")}</li>
                  <li>{t("A-we5")}</li>
                  <li>{t("A-we6")}</li>
                  <li>{t("A-we7")}</li>
                </ol>
              </div>
            </div>

            <div className={Style.about_task_first}>
              <div>
                <h4>{t("A-mis")}</h4>
                <span>{t("A-mis1")}</span>
                <span>{t("A-mis2")}</span>
                <span>{t("A-mis3")}</span>
                <span>{t("A-mis4")}</span>
                <span>{t("A-mis5")}</span>
              </div>
              <div>
                <img height={600} src="../img/picture/2.jpg" alt="pictur" />
              </div>
            </div>

            <div className={Style.about_end}>
              <h1>{t("A-more")}</h1>
              <div className={Style.about_end_social}>
                <Social />
              </div>
              <h3>{t("A-read")}</h3>
              <Link to={"/news"}>
                <button>
                  {t("News")} <i className="fa-solid fa-right-long"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default About;
