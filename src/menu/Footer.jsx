import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import Style from "../styles/menu/Footer/Footer.module.scss"; // Импорт стилей
import Social from "./Social"; // Импорт компонента Social для отображения социальных иконок

const Footer = () => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста

  return (
    <footer className={Style.footer}>
      {/* Обертка для колонтитула */}
      <section className={Style.footer_block}>
        {/* Секция с контентом */}
        <div className={Style.footer_social_position}>
          {/* Позиционирование социальных иконок */}
          <Social /> {/* Отображение социальных иконок */}
        </div>
        {/* Ссылка для скачивания файла */}
        <Link
          className={Style.footer_kodeks} // Применение стилей к ссылке
          to="/files/Jomart.docx" // Путь к файлу
          target="_blank" // Открытие ссылки в новой вкладке
          download // Атрибут для скачивания файла
        >
          {t("soc")} {/* Локализованный текст для ссылки */}
          <i className="fa-solid fa-file-import"></i> {/* Иконка */}
        </Link>
        <div className={Style.footer_rights}>
          {/* Блок с информацией о правах */}
          ©️ Jomart jurek {new Date().getFullYear()} {/* Текст с годом */}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
