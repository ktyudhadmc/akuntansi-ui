import { Navigate } from "react-router-dom";
import AuthLayout from "@layouts/AuthLayout";
import DefaultLayout from "@layouts/DefaultLayout";

import AuthMiddleware from "./middleware/AuthMiddleware";

import * as User from "@pages/user";
import * as UserSetting from "@pages/user/setting";

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
      { path: "products/create", element: <User.CreateProductPage /> },
      { path: "products/:id/edit", element: <User.EditProductPage /> },

      /** PURCHASE */
      { path: "purchases", element: <User.PurchasePage /> },
      { path: "purchases/create", element: <User.CreatePurchasePage /> },
      { path: "purchases/:id/edit", element: <User.EditPurchasePage /> },
      { path: "purchases/import", element: <User.ImportPurchasePage /> },

      /** SALE */
      { path: "sales", element: <User.SalePage /> },
      { path: "sales/create", element: <User.CreateSalePage /> },
      { path: "sales/:id/edit", element: <User.EditSalePage /> },
      { path: "sales/import", element: <User.ImportSalePage /> },

      /** INVENTORY */
      { path: "inventories", element: <User.InventoryPage /> },
      { path: "inventories/create", element: <User.CreateInventoryPage /> },

      /** REPORT */
      { path: "reports", element: <User.ReportPage /> },
      { path: "reports/journal", element: <User.ReportBusinessJournalPage /> },

      /** SETTING */
      {
        path: "settings",
        children: [
          { index: true, element: <Navigate to="companies" replace /> },
          { path: "companies", element: <UserSetting.CompanyPage /> },
          { path: "users", element: <UserSetting.UserPage /> },
        ],
      },
    ],
  },
];
