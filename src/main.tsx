import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";


import { AppWrapper } from "@components/common/PageMeta.tsx";
import { ThemeProvider } from "@context/ThemeContext.tsx";

import GetBrowserRoutes from "./routes/index.routes";

import "./styles/index.css";

import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@components/Reusable/Loader";
import config from "@constants/config";

const apiRegex = new RegExp(
  config.BASE_API_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
);

Sentry.init({
  dsn: config.SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", apiRegex],
});

// const router = createBrowserRouter(GetBrowserRoutes());

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV6(createBrowserRouter);

const router = sentryCreateBrowserRouter(GetBrowserRoutes());
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ToastContainer position="top-right" style={{ zIndex: 100000 }} />

    <Suspense fallback={<Loader />} >
      <ThemeProvider>
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);
