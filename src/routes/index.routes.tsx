// import _companyRoutes from "./_company.routes";
import _userRoutes from "./_user.routes";

import * as Landing from "@pages/landing";
// import * as Global from "@pages/global";

export default function GetBrowserRoutes() {
  return [
    {
      path: "/",
      element: <Landing.Home />,
    },

    // {
    //   path: "/error-page",
    //   element: <Global.NotFoundPage />,
    // },
    // {
    //   path: "*",
    //   element: <Global.NotFoundPage />,
    // },

    ..._userRoutes,
    // ..._companyRoutes,
  ];
}
