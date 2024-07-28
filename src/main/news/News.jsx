import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок
import { db } from "../.."; // Импорт объекта db из корневой директории для работы с Firebase Firestore
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore"; // Импорт функций и объектов Firestore для работы с коллекциями, запросами и документами
import { useTranslation } from "react-i18next"; // Импорт хука useTranslation для локализации текста
import { useState, useEffect, useCallback } from "react"; // Импорт хуков useState, useEffect, useCallback из React для управления состоянием и выполнения эффектов
import { useInView } from "react-intersection-observer"; // Импорт хука useInView из библиотеки react-intersection-observer для определения видимости элемента во вьюпорте
import Section from "../../UI_kit/Section"; // Импорт компонента Section для создания секции страницы
import Social from "../../menu/Social"; // Импорт компонента Social из папки menu для отображения социальных кнопок
import DateFun from "../../components/DateFun"; // Импорт функции DateFun для форматирования даты
import Style from "../../styles/main/news/news.module.scss"; // Импорт стилей для компонента News
import Preloader from "../../components/Preloaders/Preloader"; // Импорт компонента Preloader для отображения индикатора загрузки

const News = () => {
  const [t] = useTranslation(); // Получение функции перевода t из хука useTranslation
  const [posts, setPosts] = useState([]); // Состояние для хранения массива постов
  const [countPosts, setCountPosts] = useState(1); // Состояние для хранения количества загружаемых постов
  document.title = `Jomart jurek | ${t("News")}`; // Установка заголовка страницы с использованием текущего языка и локализованной строки "News"
  const { ref, inView } = useInView({
    // Инициализация хука useInView для отслеживания видимости элемента
    threshold: 0, // Порог видимости 0, что означает, что элемент считается видимым, если он хотя бы частично виден
  });

  const loadMoreData = useCallback(async (lastDocument, count) => {
    // Функция для загрузки дополнительных данных
    let q = query(
      // Создание запроса к коллекции "news" с сортировкой по полю "createdAt" по убыванию
      collection(db, "news"),
      limit(count), // Ограничение количества возвращаемых документов
      orderBy("createdAt", "desc")
    );
    if (lastDocument) {
      // Если передан последний документ, добавляем условие для загрузки следующих документов
      q = query(q, startAfter(lastDocument));
    }

    const data = []; // Создание пустого массива для хранения данных
    const querySnapshot = await getDocs(q); // Выполнение запроса и получение снимка запроса
    querySnapshot.forEach((doc) => {
      // Перебор документов и добавление данных в массив
      data.push(doc.data());
    });

    setPosts((prev) => (prev = data)); // Установка массива постов в состояние
  }, []);

  const loadNextPage = useCallback(
    // Функция для загрузки следующей страницы
    async (count) => {
      let lastDocument = null; // Инициализация последнего документа как null
      await loadMoreData(lastDocument, count); // Вызов функции загрузки дополнительных данных
    },
    [loadMoreData]
  );

  useEffect(() => {
    // Эффект, срабатывающий при изменении состояния загрузки следующей страницы
    loadNextPage(countPosts); // Вызов функции загрузки следующей страницы
  }, [loadNextPage, countPosts]);

  useEffect(() => {
    // Эффект, срабатывающий при изменении состояния видимости элемента во вьюпорте
    if (inView) {
      // Если элемент видим, увеличиваем количество загружаемых постов
      setCountPosts((prev) => (prev += 5));
    }
  }, [inView]);

  if (!posts) return <Preloader />; // Если посты не загружены, отображаем индикатор загрузки

  return (
    <main>
      <Section>
        <div className={Style.news}>
          <div className={Style.news_title}>
            <div className={Style.news_title_first}>
              <h1>{t("N-all")}</h1>
            </div>
            <div className={Style.news_title_second}>
              <div className={Style.news_title_second_social}>
                <Social />
              </div>
            </div>
          </div>
          <div className={Style.news_block}>
            {posts && // Если посты загружены, отображаем их
              posts.map((data) => (
                <Link key={data.id} to={`/news/${data.id}`}>
                  <article title={data.theme} className={Style.news_block_item}>
                    <div className={Style.news_block_item_theme}>
                      <h3>{data.theme}</h3>
                      <time>{DateFun(data.createdAt)}</time>
                    </div>
                    <div className={Style.news_block_item_img}>
                      <img src={data.img} alt="img" />
                    </div>
                  </article>
                </Link>
              ))}
          </div>
          <div className={Style.news_flag} ref={ref}></div>
        </div>
      </Section>
    </main>
  );
};

export default News;
