import Style from "../styles/menu/Lang/Lang.module.scss"; // Импорт стилей
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста

const Lang = ({ setLang }) => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста

  return (
    <section className={Style.outLang}>
      {/* Обертка для компонента */}
      <button
        title={"Сменить язык"}
        className={Style.lang} // Применение стилей к кнопке
        onClick={() => {
          setLang((prev) => !prev); // Изменение состояния для открытия/закрытия блока с выбором языка
        }}
      >
        <p>
          <b>{t("Lang")}</b> {/* Локализованный текст для кнопки */}
          <i className="fa-solid fa-globe"></i> {/* Иконка */}
        </p>
      </button>
    </section>
  );
};

export default Lang;
