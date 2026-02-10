import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import * as Sentry from "@sentry/react";

import { AppWrapper } from "@components/common/PageMeta.tsx";
import { ThemeProvider } from "@context/ThemeContext.tsx";
import Loader from "@components/Reusable/Loader";
import { initAnalytics, subscribeGA } from "@constants/analytics";

import GetBrowserRoutes from "./routes/index.routes";

import "./styles/index.css";

import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import "react-toastify/dist/ReactToastify.css";



initAnalytics();

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV6(createBrowserRouter);

const router = sentryCreateBrowserRouter(GetBrowserRoutes());

subscribeGA(router);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ToastContainer position="top-center" style={{ zIndex: 100001 }} autoClose={500}/>

    <Suspense fallback={<Loader />} >
      <ThemeProvider>
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);
