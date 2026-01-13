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
      { path: "dashboard", element: <User.Dashboard /> },

      /** PROFIL */
      { path: "profile", element: <User.ProfilePage /> },

      /** ACCOUNT */
      { path: "accounts", element: <User.AccountPage /> },
      { path: "accounts/create", element: <User.CreateAccountPage /> },
      { path: "accounts/:id/edit", element: <User.EditAccountPage /> },
    ],
  },
];
