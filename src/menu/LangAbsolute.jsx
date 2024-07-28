import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Style from "../styles/menu/LangAbsolute/LangAbdolute.module.scss";

const LangAbsolute = ({ setLang }) => {
  const htmlDOM = document.querySelector("html");
  htmlDOM.setAttribute("lang", localStorage.getItem("i18nextLng"));
  const [t, i18n] = useTranslation();
  const changeLanguage = (language) => i18n.changeLanguage(language);
  const langRefUl = useRef(null);

  // массив обьектов языков
  const langCollecton = [
    { title: "English", 
      langKey: "en",
      flag: "../../../../img/Header/usa.png" 
    },
    {
      title: "Русский",
      langKey: "ru",
      flag: "../../../../img/Header/Russia.png",
    },
    {
      title: "Қазақ",
      langKey: "kz",
      flag: "../../../../img/Header/Kazakhstan.png",
    },
  ];

  useEffect(() => {
    // Добавление слушателя событий для закрытия блока при нажатии на Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setLang(false);
      }
    });

    // Добавление слушателя событий для закрытия блока при клике вне него
    const handler = (event) => {
      if (!langRefUl.current.contains(event.target)) {
        setLang(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setLang]);

  return (
    <div className={Style.langAbsolute}>
      <div ref={langRefUl} className={Style.langAbsolute_block}>
        <h3>{t("changLang")}</h3>
        <ul className={Style.langChange}>
          {langCollecton &&
            langCollecton.map((data, id) => (
              <li
                key={id}
                title={data.title}
                onClick={() => {
                  setLang((prev) => (prev = false));
                  changeLanguage(data.langKey);
                  htmlDOM.setAttribute(
                    "lang",
                    localStorage.getItem("i18nextLng")
                  );
                }}
              >
                <img width={18} height={25} src={data.flag} alt="flag" />
                <p>{data.title}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LangAbsolute;
