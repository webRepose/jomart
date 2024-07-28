import { db } from "../.."; // Импорт объекта db из корневой директории для работы с Firebase Firestore
import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore"; // Импорт функций и объектов Firestore для работы с коллекциями, запросами и документами
import { useCollectionData } from "react-firebase-hooks/firestore"; // Импорт хука useCollectionData из react-firebase-hooks/firestore для получения данных коллекции
import { useEffect, useState } from "react"; // Импорт хуков useEffect, useState из React для управления состоянием и выполнения эффектов
import { useTranslation } from "react-i18next"; // Импорт хука useTranslation для локализации текста
import DateFun from "../../components/DateFun"; // Импорт функции DateFun для форматирования даты
import Section from "../../UI_kit/Section"; // Импорт компонента Section для создания секции страницы
import Style from "../../styles/main/news/newsID/newsId.module.scss"; // Импорт стилей для компонента NewsID
import Share from "./Share"; // Импорт компонента Share для отображения кнопок шаринга
import Preloader from "../../components/Preloaders/Preloader"; // Импорт компонента Preloader для отображения индикатора загрузки

const NewsID = () => {
  const [t] = useTranslation(); // Получение функции перевода t из хука useTranslation
  const [news, setNews] = useState(null); // Состояние для хранения данных о новости
  document.title = `Jomart jurek | ${news ? news.theme : t("News")}`; // Установка заголовка страницы с использованием текущего языка и локализованной строки "News"
  const [posts, loading] = useCollectionData(
    // Получение данных о последних новостях
    query(collection(db, "news"), orderBy("createdAt", "desc"), limit(5))
  );
  const [stateLoc, setStateLoc] = useState(
    // Состояние для хранения пути к новости в URL
    window.location.pathname.replace("/news/", "")
  );

  useEffect(() => {
    // Эффект, срабатывающий при изменении stateLoc
    const getNews = async () => {
      const news = await getDoc(doc(db, "news", stateLoc)); // Получение данных о новости из Firestore
      setNews((prev) => (prev = news.data())); // Установка данных о новости в состояние
    };
    getNews();
  }, [stateLoc]);

  if (loading) return <Preloader />; // Если данные загружаются, отображаем индикатор загрузки

  return (
    <main>
      <Section>
        <div className={Style.newsItem}>
          <div className={Style.newsItem_social}>
            <Share shareRes={window.location.href} title={news && news.theme} />
          </div>
          <div className={Style.newsItem_news}>
            {news && ( // Если данные о новости загружены, отображаем время публикации
              <time className={Style.newsItem_news_time}>
                {DateFun(news.createdAt)}
              </time>
            )}

            <h3 className={Style.newsItem_news_theme}>{news && news.theme}</h3>
            <div>
              <div className={Style.newsItem_social_mobile}>
                <Share
                  shareRes={window.location.href}
                  title={news && news.theme}
                />
              </div>
            </div>
            <hr className={Style.newsItem_news_line} />
            {news && ( // Если данные о новости загружены, отображаем изображение новости
              <img width={749} height={421} src={news.img} alt="imgnews" />
            )}

            <hr className={Style.newsItem_news_line} />

            <p // Описание новости в виде HTML-кода
              className={Style.newsItem_news_desk}
              dangerouslySetInnerHTML={{ __html: news && news.desk }}
            ></p>
          </div>
          <div className={Style.newsItem_lastNews}>
            <h3>{t("NI-last")}</h3>
            {posts && // Если данные о последних новостях загружены, отображаем их
              posts.map((data) => (
                <Link
                  onClick={() => {
                    // Обработчик клика для обновления stateLoc при переходе к другой новости
                    setStateLoc(
                      (prev) =>
                        (prev = window.location.pathname.replace("/news/", ""))
                    );
                  }}
                  to={
                    window.location.href.replace(
                      // Формирование URL для ссылки на новость
                      window.location.pathname.replace("/news/", ""),
                      ""
                    ) + data.id
                  }
                  key={data.id}
                >
                  <article>
                    <h4>{data.theme}</h4>
                    <time>{DateFun(data.createdAt)}</time>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default NewsID;
