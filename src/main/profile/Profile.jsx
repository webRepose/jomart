import { useState, useEffect, useCallback } from "react"; // Импорт хуков useState, useEffect, useCallback
import { firestore, db } from "../../index"; // Импорт Firestore и базы данных
import { useInView } from "react-intersection-observer"; // Импорт хука для отслеживания видимости элемента
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import {
  ref as refe,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"; // Импорт функций для работы с хранилищем файлов
import Section from "../../UI_kit/Section"; // Импорт компонента Section
import Style from "../../styles/main/profile/profile.module.scss"; // Импорт стилей
import {
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore"; // Импорт функций Firestore
import Preloader from "../../components/Preloaders/Preloader"; // Импорт компонента Preloader

const Profile = () => {
  const [posts, setPosts] = useState([]); // Состояние для хранения списка новостей
  const [countPosts, setCountPosts] = useState(1); // Состояние для хранения количества загружаемых новостей

  const [t] = useTranslation(); // Инициализация хука для локализации текста
  const [image, setImage] = useState(null); // Состояние для хранения изображения новости
  const [theme, setTheme] = useState(""); // Состояние для хранения темы новости
  const [desk, setDesk] = useState(""); // Состояние для хранения описания новости
  const [uidDoc, setUidDoc] = useState("post=" + Math.random(10000)); // Состояние для хранения идентификатора документа
  const [idImg, setIdImg] = useState(Math.random(1000000)); // Состояние для хранения идентификатора изображения
  const [changing, setChanging] = useState(false); // Состояние для отображения формы редактирования новости
  const [documentChangeData, setDocumentChangeData] = useState(""); // Состояние для хранения данных редактируемой новости
  const [imgNameDelete, setImgNameDelete] = useState(null); // Состояние для хранения имени удаляемого изображения
  document.title = `Jomart jurek | ${t("profile")}`; // Установка заголовка страницы

  // Хук для отслеживания видимости элемента и подгрузки новых данных
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Функция для подгрузки дополнительных данных
  const loadMoreData = useCallback(async (lastDocument, count) => {
    let q = query(
      collection(db, "news"),
      limit(count),
      orderBy("createdAt", "desc")
    );
    if (lastDocument) {
      q = query(q, startAfter(lastDocument));
    }

    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setPosts((prev) => (prev = data));
  }, []);

  // Функция для подгрузки следующей страницы данных
  const loadNextPage = useCallback(
    async (count) => {
      let lastDocument = null;
      await loadMoreData(lastDocument, count);
    },
    [loadMoreData]
  );

  // Загрузка следующей страницы при изменении количества загружаемых новостей
  useEffect(() => {
    loadNextPage(countPosts);
  }, [loadNextPage, countPosts]);

  // Обработка события видимости элемента и загрузки новых данных
  useEffect(() => {
    if (inView) {
      setCountPosts((prev) => (prev += 25));
    }
  }, [inView]);

  // Функция для отправки данных новости
  const send = async () => {
    if (
      image === null ||
      image === "" ||
      image === undefined ||
      !isNaN(image) ||
      theme === "" ||
      desk === ""
    ) {
      alert(t("P-allInput"));
      return false;
    }
    const imageRef = refe(firestore, `img/${image.name + idImg}`);

    await uploadBytes(imageRef, image).then((e) => {
      getDownloadURL(e.ref)
        .then((url) => {
          setDoc(doc(db, "news", uidDoc), {
            desk: desk,
            theme: theme,
            createdAt: Timestamp.fromDate(new Date()),
            changed: false,
            img: url,
            imgName: image.name + idImg,
            id: uidDoc,
          });

          reset();
        })
        .then(() => {
          alert(t("P-createdNews"));
          loadNextPage(countPosts);
        });
    });
  };

  // Функция для сброса данных формы
  const reset = () => {
    setImage((prev) => (prev = ""));
    setDesk((prev) => (prev = ""));
    setTheme((prev) => (prev = ""));
    setUidDoc((prev) => (prev = "post=" + Math.random(10000)));
    setIdImg((prev) => (prev = Math.random(10000)));
  };

  // Обработка перетаскивания файла
  const handleDrop = (e) => {
    e.preventDefault();
    setImage((prev) => (prev = e.dataTransfer.files[0]));
  };

  // Функция для удаления новости
  const deleteNews = async (e, img) => {
    const res = window.confirm(t("P-deletedNews"));
    if (res) {
      await deleteDoc(doc(db, "news", e));
      await deleteObject(refe(firestore, `img/${img}`));
      loadNextPage(countPosts);
    }
  };

  // Функция для редактирования новости
  const changeNews = async (e, img) => {
    setChanging((prev) => (prev = true));
    const changeDoc = await getDoc(doc(db, "news", e));
    const document = changeDoc.data();
    setDocumentChangeData((prev) => (prev = document));
    setTheme((prev) => (prev = document.theme));
    setDesk((prev) => (prev = document.desk));
    setImgNameDelete((prev) => (prev = img));
  };

  // Функция для обновления новости
  const updateNews = async (id) => {
    console.log(image);
    if (
      image === null ||
      image === "" ||
      image === undefined ||
      !isNaN(image) ||
      theme === "" ||
      desk === ""
    ) {
      alert(t("P-allInput"));
      return false;
    }
    const imageRef = refe(firestore, `img/${image.name + idImg}`);

    await uploadBytes(imageRef, image).then((e) => {
      getDownloadURL(e.ref)
        .then((url) => {
          updateDoc(doc(db, "news", id), {
            desk: desk,
            theme: theme,
            changed: true,
            img: url,
            imgName: image.name + idImg,
          });

          deleteObject(refe(firestore, `img/${imgNameDelete}`));

          reset();
          setChanging((prev) => (prev = false));
        })
        .then(() => {
          alert(t("P-changedNews"));
          loadNextPage(countPosts);
        });
    });
  };

  // Отображение компонента Preloader при загрузке данных
  if (!posts) return <Preloader />;

  return (
    <main>
      <Section>
        <div className={Style.profile}>
          <div className={Style.profile_first}>
            {!changing ? (
              <div>
                <h1>{t("P-create")}</h1>
                <input
                  value={theme}
                  className={Style.profile_theme}
                  type="text"
                  placeholder={t("P-nameTheme")}
                  onChange={(e) => {
                    setTheme((prev) => (prev = e.target.value));
                  }}
                />
                <div
                  className={Style.profile_upload}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  <p>{image ? t("P-img2") : t("P-img1")}</p>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <textarea
                  value={desk}
                  onChange={(e) => {
                    setDesk((prev) => (prev = e.target.value));
                  }}
                  className={Style.profile_description}
                  placeholder={t("P-desk")}
                ></textarea>
                <button className={Style.profile_create} onClick={send}>
                  {t("P-createBTN")}
                </button>
              </div>
            ) : (
              <div>
                <h1>{t("P-recreate")}</h1>
                <input
                  value={theme}
                  className={Style.profile_theme}
                  type="text"
                  placeholder={t("P-nameTheme")}
                  onChange={(e) => {
                    setTheme((prev) => (prev = e.target.value));
                  }}
                />
                <div
                  className={Style.profile_upload}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  <p>{image ? t("P-img2") : t("P-img3")}</p>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <textarea
                  value={desk}
                  onChange={(e) => {
                    setDesk((prev) => (prev = e.target.value));
                  }}
                  className={Style.profile_description}
                  placeholder={t("P-desk")}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                >
                  <button
                    className={Style.profile_create}
                    onClick={() => {
                      updateNews(documentChangeData && documentChangeData.id);
                    }}
                  >
                    {t("P-save")}
                  </button>
                  <button
                    className={Style.profile_recreate}
                    onClick={() => {
                      setChanging((prev) => (prev = false));
                      reset();
                    }}
                  >
                    {t("P-close")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={Style.profile_second}>
            <h2>{t("P-newsList")}</h2>
            <table className={Style.profile_table}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{t("P-theme")}</th>
                  <th scope="col">{t("P-change")}</th>
                  <th scope="col">{t("P-delete")}</th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((data, id) => (
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td className={Style.profile_table_theme}>
                        {data.theme}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            changeNews(data.id, data.imgName);
                          }}
                        >
                          {t("P-change")}
                        </button>
                      </td>
                      <td>
                        <button
                          className={Style.profile_table_delete}
                          onClick={() => {
                            deleteNews(data.id, data.imgName);
                          }}
                        >
                          {t("P-delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div ref={ref}></div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Profile;
