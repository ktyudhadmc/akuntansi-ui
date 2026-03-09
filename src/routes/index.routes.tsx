import { lazy } from "react";
import _userRoutes from "./_user.routes";
import D3Js from "@pages/global/D3Js";

const NotFoundPage = lazy(() => import("@pages/global/OtherPage/NotFoundPage"));
const ComingSoonPage = lazy(
  () => import("@pages/global/OtherPage/ComingSoonPage"),
);

export default function GetBrowserRoutes() {
  return [
    {
      path: "/",
      element: <ComingSoonPage />,
    },

    {
      path: "/error-page",
      element: <NotFoundPage />,
    },
    {
      path: "/chart-d3js",
      element: <D3Js />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },

    ..._userRoutes,
    // ..._companyRoutes,
  ];
}
