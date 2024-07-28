import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "..";
import ErrorBoundary from "./ErrorBounds/ErrorBoundary";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

const Preloader = lazy(() => import("./Preloaders/Preloader")),
  // Головной комонент с роутизацией всего приложения подгружаются все файлы и происходит рендер путей для авторизованных пользователей и для неовторизованных
  News = lazy(() => import("../main/news/News")),
  NewsID = lazy(() => import("../main/news/NewsID")),
  About = lazy(() => import("../main/about/About")),
  // Home = lazy(() => import("../main/home/Home")),
  Contact = lazy(() => import("../main/Contact/Contact")),
  Profile = lazy(() => import("../main/profile/Profile")),
  Photos = lazy(() => import("../main/photos/Photos")),
  privatRoutes = [
    {
      path: "/profile",
      Component: Profile,
    },
  ],
  publicRoutes = [
    {
      path: "/",
      Component: About,
    },
    // {
    //   path: "/about",
    //   Component: About,
    // },
    {
      path: "/contact",
      Component: Contact,
    },
    {
      path: "/photos",
      Component: Photos,
    },
    {
      path: "/news",
      Component: News,
    },
    {
      path: "/news/:id",
      Component: NewsID,
    },
  ];

const AppRouter = memo(() => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const uid = user ? user.uid : "";

  useEffect(() => {
    if (uid) {
      const userGet = async () => {
        const data = await getDoc(doc(db, "users", uid));
        setAdmin((prev) => (prev = data.data().admin));
      };

      userGet();
    }
  }, [uid, setAdmin]);

  return user && admin ? (
    <Routes>
      {privatRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Preloader />}>
              <ErrorBoundary>
                <Component />
              </ErrorBoundary>
            </Suspense>
          }
        />
      ))}
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
});

export default AppRouter;
