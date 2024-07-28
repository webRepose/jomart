import Section from "../../UI_kit/Section";
import Social from "../../menu/Social";
import { Link } from "react-router-dom";
import Style from "../../styles/main/contact/contact.module.scss";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [t] = useTranslation();
  document.title = 'Jomart jurek | '+ t("Contact");

  return (
    <main>
      <Section>
        <div className={Style.contact}>
          <div>
            <h1>{t("C-data")}</h1>
            <p>{t("C-adres")}</p>
            <div className={Style.contact_soc}>
              <h3>{t("C-soc")}</h3>
              <Social />
            </div>
            <div className={Style.contact_partner_block}>
              <h2>{t("C-partner")}</h2>
              <div className={Style.contact_partner}>
                <Link
                  target="_blank"
                  to={"https://egov.kz/cms/ru"}
                  className={Style.contact_egov}
                >
                  <img src="../img/social/egov.png" alt="egov" />
                </Link>
                <Link
                  target="_blank"
                  to={"https://aleumet.egov.kz/"}
                  className={Style.contact_egov}
                >
                  <img src="../img/social/aleu.svg" alt="aleumet" />
                </Link>
                <Link
                  target="_blank"
                  to={"https://psubeta.enbek.kz/"}
                  className={Style.contact_egov}
                >
                  <img src="../img/social/psu.png" alt="psubeta" />
                </Link>
                <Link
                  target="_blank"
                  to={
                    "https://esportkrg.kz/ru/firm/view/kgu-oblastnaya-specializirovannaya-shkola-po-invalidnomu-sportu"
                  }
                  className={Style.contact_egov}
                >
                  <img src="../img/social/sport.svg" alt="icon sport" />
                </Link>
              </div>
            </div>

            <Link
              className={Style.contact_kodeks} // Применение стилей к ссылке
              to="/files/Jomart.docx" // Путь к файлу
              target="_blank" // Открытие ссылки в новой вкладке
              download // Атрибут для скачивания файла
            >
              {t("C-kodeks")}
              {/* Локализованный текст для ссылки */}
              <i className="fa-solid fa-file-import"></i> {/* Иконка */}
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Contact;
