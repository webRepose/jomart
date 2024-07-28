import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import { NavLink } from "react-router-dom"; // Импорт компонента NavLink для навигации

const MenuList = ({ style, setMenu }) => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста
  const menu = [
    // Массив объектов с данными о пунктах меню
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/news",
      title: "News",
    },
    // {
    //   to: "/about",
    //   title: "About",
    // },
    {
      to: "/contact",
      title: "Contact",
    },
    {
      to: "/photos",
      title: "P-photo",
    },
  ];
  return (
    <nav className={style.header_menu}>
      {/* Навигационное меню */}
      <ul>
        {menu && // Отображение пунктов меню
          menu.map((data, id) => (
            <li key={id}>
              <NavLink
                onClick={() => {
                  document.querySelector("body").style.overflow = "auto";
                  setMenu && setMenu((prev) => !prev); // Закрытие меню при клике на пункт
                }}
                className={({ isActive }) => [isActive && style.active]} // Добавление активного класса при активной странице
                to={data.to} // Ссылка для перехода
              >
                {t(data.title)} {/* Локализованный текст пункта меню */}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuList;
