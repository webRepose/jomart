import Style from "../styles/menu/Footer/Footer.module.scss"; // Импорт стилей
import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom

const Social = () => {
  // Массив объектов с данными о социальных сетях
  const social = [
    {
      to: "https://www.instagram.com/oo_jomart_jurek",
      src: "../../img/social/instagram.png",
      alt: "instagram",
    },
    {
      to: "https://www.tiktok.com/@jomartjurek?_t=8l7EGlwkg4L&_r=1",
      src: "../../img/social/tiktok.png",
      alt: "tiktok",
    },
    {
      to: "https://wa.me/77084362381?text=",
      src: "../../img/social/whatsapp.png",
      alt: "whatsapp",
    },
    // {
    //   to: "#",
    //   src: "../../img/social/gmail.png",
    //   alt: "mail",
    // },
  ];

  return (
    <div className={Style.footer_social}>
      {/* Отображение списка ссылок на социальные сети */}
      {social &&
        social.map((data, id) => (
          <Link key={id} target="_blank" to={data.to}>
            <img src={data.src} alt={data.alt} />
          </Link>
        ))}
    </div>
  );
};

export default Social;
