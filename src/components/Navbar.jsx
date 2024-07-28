import { auth } from "../index";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import Style from "../styles/components/navbar/navbar.module.scss";
import Theme from "../menu/Theme";
import Lang from "../menu/Lang";
import LangAbsolute from "../menu/LangAbsolute";
import MenuList from "../menu/MenuList";

// хеадер, тут меню лого смена языка и прочее

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [t] = useTranslation();
  const [lang, setLang] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const signBtnRef = useRef(null);
  const [burger, setBurger] = useState(null);

  const setMenu = () => {
    setUserMenu((prev) => !prev);
  };

  const showMenu = () => {
    setBurger((prev) => !prev);
    if (burger) {
      document.querySelector("body").style.overflow = "auto";
    } else document.querySelector("body").style.overflow = "hidden";
  };

  const signOut = () => {
    const resExit = window.confirm(t("really_ex"));
    resExit && auth.signOut();
    setUserMenu((prev) => !prev);
    setLogin((prev) => (prev = false));
  };

  const signIn = () => {
    setLogin((prev) => (prev = true));
  };

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") setUserMenu((prev) => (prev = false));
    });
  }, []);

  return (
    <>
      <header className={Style.header}>
        <button
          onClick={showMenu}
          className={`${Style.header_burger} ${
            burger ? Style.header_burger_active : ""
          }`}
        >
          <div></div>
          {!burger && <div></div>}
          <div></div>
        </button>

        <Link className={Style.header_logo_position} to={"/"}>
          <img
            className={Style.header_logo}
            src={"../../img/logo.jpg"}
            width={40}
            alt="logo"
          />
          <h2>Jomart-jurek</h2>
        </Link>

        <div className={Style.header_menu_pc}>
          <MenuList style={Style} setMenu={""} />
        </div>

        <div className={Style.header_theme_pc}>
          <Theme title={t("theme")} />
          <Lang setLang={setLang} />
        </div>
        {user ? (
          <button onClick={setMenu} className={Style.header_ava}>
            {
              <img
                width={37}
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://static.tildacdn.com/tild3238-3834-4566-b939-643034303766/no-profile.png"
                }
                alt="ava"
              />
            }
          </button>
        ) : (
          <button
            ref={signBtnRef}
            className={Style.header_signin}
            onClick={() => {
              signIn();
              document.querySelector("body").style.overflow = "hidden";
            }}
          >
            <i
              style={{ marginRight: "10px" }}
              className="fa-solid fa-right-to-bracket"
            ></i>
            <b>{t("signin")}</b>
          </button>
        )}

        {userMenu && (
          <nav className={Style.header_user}>
            <ul>
              <li>
                <Link
                  onClick={() => setUserMenu((prev) => !prev)}
                  to="/profile"
                >
                  <button>
                    <i className="fa-solid fa-user"></i> {t("profile")}
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={signOut}>
                  <i className="fa-solid fa-right-from-bracket"></i> {t("exit")}
                </button>
              </li>
            </ul>
          </nav>
        )}
        {burger && (
          <section className={Style.header_menu_absolute}>
            <MenuList style={Style} setMenu={setBurger} />
            <Lang setLang={setLang} />
            <Theme setBurger={setBurger} title={t("theme")} />
          </section>
        )}
      </header>
      {lang && <LangAbsolute setLang={setLang} />}
      {login && !user && <Login setLogin={setLogin} btnRef={signBtnRef} />}
    </>
  );
};

export default Navbar;
