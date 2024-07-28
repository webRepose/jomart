import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/photos/photos.module.scss";

const Photos = () => {
  const [t] = useTranslation();
  document.title = "Jomart jurek | " + t("P-photo");

  const imgData = [
    {
      src: "../img/picture/2.jfif",
      title: "img",
      description:
        "Выражаем огромную благодарность руководству и коллективу 'Кондитерская - кофейня `hani` @hani.c.c за оказанную помощь для лиц с ограниченными возможностями нашего общества! Желаем Вам крепкого здоровья и процветания вашему бизнесу! Спасибо Вам огромное ❤️❤️❤️",
      date: "15.03.2024",
      link: "https://www.instagram.com/p/C4hk0NmNYT3/",
    },
    {
      src: "../img/picture/1.jfif",
      title: "img",
      description:
        "Выражаем огромную благодарность руководителю ТОО 'ЦЭМ-Геомаш' Шаталовой Анастасие Геннадьевне За оказанную помощь для лиц с ограниченными возможностями нашего общества. Спасибо Вам огромное❤️❤️❤️",
      date: "15.04.2024",
      link: "https://www.instagram.com/p/C5xXl3Ntj6b/",
    },
    {
      src: "../img/picture/3.jfif",
      title: "img",
      description:
        "Поздравляем члена нашего общества Абая Сыздыкова с победой в соревнованиях по АРМ. Так держать! Молодец!",
      date: "07.03.2024",
      link: "https://www.instagram.com/p/C4NWy4sNCba/?img_index=1",
    },
    {
      src: "../img/picture/4.jfif",
      title: "img",
      description:
        "Сегодня мы посетили семью Теслиных! Выражаем огромную благодарность нашим спонсорам за оказанную ими помощь! Добро творите безвозмездно, С открытым сердцем и душой. Добросердечие — полезно, В нем радость, счастье и покой.",
      date: "20.09.2023",
      link: "https://www.instagram.com/p/CxZ9LIBtxJz/?img_index=1",
    },
    {
      src: "../img/picture/5.jfif",
      title: "img",
      description:
        "10 января 2024 года в Областном Акимате г. Караганды прошло заседание Координационного Совета по вопросам лиц с инвалидностью.",
      date: "10.01.2024",
      link: "https://www.instagram.com/p/C2RSouXNUu1/?img_index=1",
    },

    {
      src: "../img/picture/6.jfif",
      title: "img",
      description:
        "Вот и закончилась подготовка к школе! Все наши дети получили качественные рюкзаки с канцелярскими товарами! Выражаем огромную благодарность всем нашим спонсорам за активную помощь для нашего общества!",
      date: "31.07.2023",
      link: "https://www.instagram.com/p/CwmUoWpNAQQ/?img_index=1",
    },
  ];

  return (
    <main>
      <Section>
        <div className={Style.photos}>
          <h1 className={Style.photos_title}>{t("P-photo")}</h1>
          <div className={Style.photos_img}>
            {imgData &&
              imgData.map((data, id) => (
                <article className={Style.photos_img_item} key={id}>
                  <img src={data.src} alt={data.title} />
                  <p className={Style.photos_img_item_desk}>
                    {data.description}
                  </p>
                  <div className={Style.photos_img_item_date}>
                    <p>{data.date}</p>
                    <Link target="_blank" to={data.link}>
                      {t("P-see")}
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Photos;
