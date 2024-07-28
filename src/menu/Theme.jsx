import { useState } from "react";
import Style from "../styles/menu/Theme/Theme.module.scss";
import { useTranslation } from "react-i18next";

const Theme = ({ title }) => {
  const [t] = useTranslation();
  const htmlDOM = document.querySelector("html");
  // Устанавливаем тему приложения в зависимости от предпочтений пользователя или сохраненной настройки
  if (window.localStorage.getItem("theme") == null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      window.localStorage.setItem("theme", "dark");
      htmlDOM.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      htmlDOM.classList.add("light");
      window.localStorage.setItem("theme", "light");
    }
  }

  // Устанавливаем тему приложения в зависимости от сохраненной настройки
  if (window.localStorage.getItem("theme") === "dark") {
    htmlDOM.classList.add("dark");
    htmlDOM.classList.remove("light");
    window.localStorage.setItem("theme", "dark");
  } else {
    htmlDOM.classList.add("light");
    htmlDOM.classList.remove("dark");
    window.localStorage.setItem("theme", "light");
  }

  // Логика изменения темы приложения и настройки шрифта
  const [vievPanes, setViewPanel] = useState(false);
  const dark = () => {
    htmlDOM.classList.add("dark");
    htmlDOM.classList.remove("light");
    window.localStorage.setItem("theme", "dark");
    setViewPanel((prev) => !prev);
  };

  const light = () => {
    htmlDOM.classList.add("light");
    htmlDOM.classList.remove("dark");
    window.localStorage.setItem("theme", "light");
    setViewPanel((prev) => !prev);
  };

  const setImgDis = () => {
    document.querySelectorAll("img").forEach((e) => {
      e.style.display = "none";
    });
  };

  const setImgAct = () => {
    document.querySelectorAll("img").forEach((e) => {
      e.style.display = "block";
    });
  };

  const font = [
    {
      font: 14,
      var: "--font14",
    },
    {
      font: 15,
      var: "--font15",
    },
    {
      var: "--font16",
      font: 16,
    },
    {
      var: "--font17",
      font: 17,
    },
    {
      var: "--font18",
      font: 18,
    },
    {
      var: "--font19",
      font: 19,
    },
    {
      var: "--font20",
      font: 20,
    },
    {
      var: "--font21",
      font: 21,
    },
    {
      var: "--font22",
      font: 22,
    },
    {
      var: "--font24",
      font: 24,
    },
    {
      var: "--font28",
      font: 28,
    },
    {
      var: "--font45",
      font: 45,
    },
  ];

  const [fontState, setFontState] = useState(0);
  const Aminus = () => {
    setFontState((prev) => prev - 1);
  };

  const Aplus = () => {
    setFontState((prev) => prev + 1);
  };

  font.forEach((e) => {
    document.documentElement.style.setProperty(
      e.var,
      e.font + fontState + "px"
    );
  });

  const standart = () => {
    setViewPanel((prev) => !prev);
    setImgAct();
    setFontState((prev) => (prev = 0));
  };

  return (
    <>
      {vievPanes && (
        <div className={Style.invalPanel}>
          <div className={Style.invalPanel_content}>
            {/* Контролы для изменения размера шрифта */}
            <div>
              <h4>{t("Thm-size")}</h4>
              <div>
                <button onClick={Aminus}>А-</button>
                <button onClick={Aplus}>А+</button>
              </div>
            </div>
            {/* Контролы для изменения цветовой темы */}
            <div className={Style.invalPanel_content_color}>
              <h4>{t("Thm-color")}</h4>
              <div>
                <button onClick={light}>{t("Thm-colorN")}</button>
                <button onClick={dark}>{t("Thm-colorN")}</button>
              </div>
            </div>
            {/* Контролы для скрытия или отображения изображений */}
            <div>
              <h4>{t("Thm-img")}</h4>
              <div>
                <button onClick={setImgAct}>
                  <i className="fa-regular fa-image"></i>
                </button>
                <button onClick={setImgDis}>
                  <i className="fa-solid fa-ban"></i>
                </button>
              </div>
            </div>
            {/* Контролы для возврата к стандартным настройкам */}
            <div>
              <h4>{t("Thm-set")}</h4>
              <div>
                <button onClick={standart}>{t("Thm-standart")}</button>
                <button
                  onClick={() => {
                    setViewPanel((prev) => !prev);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Кнопка для отображения панели настроек */}
      <div
        className={Style.theme}
        onClick={() => {
          setViewPanel((prev) => !prev);
        }}
      >
        {title}
      </div>
    </>
  );
};

export default Theme;
