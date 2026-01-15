import AuthLayout from "@layouts/AuthLayout";
import DefaultLayout from "@layouts/DefaultLayout";
import * as User from "@pages/user";
import AuthMiddleware from "./middleware/AuthMiddleware";

export default [
  /** AUTH */
  {
    path: "/request",
    element: (
      <AuthMiddleware>
        <AuthLayout children={<User.SendOtp />} />
      </AuthMiddleware>
    ),
  },
  {
    path: "/verify",
    element: (
      <AuthMiddleware>
        <AuthLayout children={<User.VerifyOtp />} />
      </AuthMiddleware>
    ),
  },

  /** USER */
  {
    path: "/user",
    element: (
      <AuthMiddleware>
        <DefaultLayout />
      </AuthMiddleware>
    ),
    children: [
      { index: true, element: <User.Dashboard /> },
      { path: "onboard", element: <User.OnBoardPage /> },
      { path: "dashboard", element: <User.Dashboard /> },

      /** PROFIL */
      { path: "profile", element: <User.ProfilePage /> },

      /** ACCOUNT */
      { path: "accounts", element: <User.AccountPage /> },
      { path: "accounts/create", element: <User.CreateAccountPage /> },
      { path: "accounts/:id/edit", element: <User.EditAccountPage /> },
      { path: "accounts/:id/import", element: <User.ImportAccountPage /> },

      /** CONTACT */
      { path: "contacts", element: <User.ContactPage /> },
      { path: "contacts/create", element: <User.CreateContactPage /> },
      { path: "contacts/:id/edit", element: <User.EditContactPage /> },

      /** PRODUK */
      { path: "products", element: <User.ProductPage /> },

      /** PURCHASE */
      { path: "purchases", element: <User.PurchasePage /> },

      /** SALE */
      { path: "sales", element: <User.SalePage /> },

      /** REPORT */
      { path: "reports", element: <User.ReportPage /> },
    ],
  },
];
