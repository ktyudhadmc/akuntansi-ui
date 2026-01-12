import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppWrapper } from "@components/common/PageMeta.tsx";
import { ThemeProvider } from "@context/ThemeContext.tsx";

import GetBrowserRoutes from "./routes/index.routes";

import "./styles/index.css";

import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(GetBrowserRoutes());
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ToastContainer position="top-right" style={{ zIndex: 100000 }} />
    <ThemeProvider>
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
