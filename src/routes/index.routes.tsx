import { lazy } from "react";
import _userRoutes from "./_user.routes";

const NotFoundPage = lazy(() => import("@pages/global/OtherPage/NotFoundPage"));
const ComingSoonPage = lazy(() => import("@pages/global/OtherPage/ComingSoonPage"));


export default function GetBrowserRoutes() {
  return [
    {
      path: "/",
      element: <ComingSoonPage />
    },

    {
      path: "/error-page",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },

    ..._userRoutes,
    // ..._companyRoutes,
  ];
}
