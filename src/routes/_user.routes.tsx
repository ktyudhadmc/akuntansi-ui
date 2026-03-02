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
      {
        path: "accounts",
        children: [
          { index: true, element: <Navigate to="chart-of-account" replace /> },

          /** ACCOUNT - CHART OF ACCOUNT */
          {
            path: "chart-of-account",
            children: [
              { index: true, element: <User.COAPage /> },
              { path: "create", element: <User.COACreatePage /> },
              { path: ":id", element: <User.COAShowPage /> },
              { path: ":id/edit", element: <User.COAEditPage /> },
              { path: ":id/import", element: <User.COAImportPage /> },
              { path: "balance-setup", element: <User.COABalanceSetupPage /> },
              {
                path: "balance-conversion/:id/edit",
                element: <User.COABalanceConversionpPage />,
              },
            ],
          },

          /** ACCOUNT - CASH & BANK */
          {
            path: "cash-bank",
            children: [
              { index: true, element: <User.CBPage /> },
              { path: ":id", element: <User.CBShowPage /> },
              { path: "import", element: <User.CBImportPage /> },
              { path: "journal/:id", element: <User.CBJournalShowPage /> },
            ],
          },
        ],
      },

      /** CONTACT */
      { path: "contacts", element: <User.ContactPage /> },
      { path: "contacts/create", element: <User.CreateContactPage /> },
      { path: "contacts/:id/edit", element: <User.EditContactPage /> },

      /** PERIOD */
      { path: "periods", element: <User.PeriodPage /> },
      { path: "periods/lock", element: <User.PeriodLockPage /> },
      {
        path: "periods/:id/lock-preview",
        element: <User.PeriodLockShowPage />,
      },

      { path: "periods/books/close", element: <User.PeriodClosePage /> },

      /** PRODUK */
      { path: "product-units", element: <User.ProductUnitPage /> },

      /** PRODUK */
      { path: "products", element: <User.ProductPage /> },
      { path: "products/create", element: <User.CreateProductPage /> },
      { path: "products/:id/edit", element: <User.EditProductPage /> },

      /** PRODUKSI */
      { path: "productions", element: <User.ProductionPage /> },
      { path: "productions/create", element: <User.ProductionCreatePage /> },
      { path: "productions/:id/edit", element: <User.ProductionEditPage /> },

      /** PURCHASE */
      { path: "purchases", element: <User.PurchasePage /> },
      { path: "purchases/create", element: <User.CreatePurchasePage /> },
      { path: "purchases/:id", element: <User.PurchaseShowPage /> },
      { path: "purchases/:id/edit", element: <User.EditPurchasePage /> },
      { path: "purchases/import", element: <User.ImportPurchasePage /> },

      /** SALE */
      { path: "sales", element: <User.SalePage /> },
      { path: "sales/create", element: <User.CreateSalePage /> },
      { path: "sales/:id", element: <User.SaleShowPage /> },
      { path: "sales/:id/edit", element: <User.EditSalePage /> },
      { path: "sales/import", element: <User.ImportSalePage /> },

      /** INVENTORY */
      {
        path: "inventories",
        children: [
          { index: true, element: <User.InventoryPage /> },

          /** ADJUSTMENT */
          {
            path: "adjustments",
            children: [
              {
                index: true,
                element: <Navigate to=".." replace />,
              },
              {
                path: "create",
                element: <User.InventoryAdjustmentCreatePage />,
              },
              {
                path: ":id/edit",
                element: <User.InventoryAdjustmentEditPage />,
              },
            ],
          },

          /** USAGE */
          {
            path: "usages",
            children: [
              {
                index: true,
                element: <Navigate to=".." replace />,
              },
              {
                path: "create",
                element: <User.InventoryUsageCreatePage />,
              },
              {
                path: ":id/edit",
                element: <User.InventoryUsageEditPage />,
              },
            ],
          },
        ],
      },

      /** JOURNAL */
      {
        path: "journals",
        children: [
          { index: true, element: <User.JournalPage /> },
          { path: "create", element: <User.JournalCreatePage /> },
          { path: "import", element: <User.JournalImportPage /> },
          { path: ":id/edit", element: <User.JournalEditPage /> },
        ],
      },

      /** REPORT */
      {
        path: "reports",
        children: [
          { index: true, element: <User.ReportPage /> },
          /** BUSINESS */
          { path: "journal", element: <User.RBJournalPage /> },
          { path: "journal/:id", element: <User.RBJournalShowPage /> },
          { path: "ledger", element: <User.RBLedgerPage /> },
          { path: "trial-balance", element: <User.RBTrialBalancePage /> },
          { path: "profit-loss", element: <User.RBProfitLossPage /> },
          { path: "cash-flow", element: <User.RBCashFlowPage /> },
          { path: "balance-sheet", element: <User.RBBalanceSheetPage /> },

          /** SALE */
          { path: "sales-list", element: <User.RSSaleListPage /> },
          { path: "sales-by-customer", element: <User.RSSaleByCustomerPage /> },
          { path: "customer-balance", element: <User.RSCustomerBalancePage /> },
          { path: "cogs", element: <User.RSCashOfGoodsSoldPage /> },
        ],
      },

      /** TAX */
      { path: "taxes", element: <User.TaxPage /> },
      { path: "taxes/create", element: <User.TaxCreatePage /> },
      { path: "taxes/:id/edit", element: <User.TaxEditPage /> },

      /** OTHER */
      { path: "others", element: <User.OtherPage /> },

      /** SETTING */
      {
        path: "settings",
        children: [
          { index: true, element: <Navigate to="companies" replace /> },
          { path: "companies", element: <UserSetting.CompanyPage /> },
          { path: "users", element: <UserSetting.UserPage /> },
          { path: "accounts", element: <UserSetting.AccountPage /> },
        ],
      },
    ],
  },
];
