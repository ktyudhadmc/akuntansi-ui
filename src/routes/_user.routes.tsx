import AuthLayout from "@layouts/AuthLayout";
// import DefaultLayout from "@layouts/DefaultLayout";
import * as User from "@pages/user";

export default [
  /** AUTH */
  {
    path: "/send-otp",
    element: <AuthLayout children={<User.SendOtp />} />,
  },
  {
    path: "/verify-otp",
    element: <AuthLayout children={<User.VerifyOtp />} />,
  },

  /** USER */
  // {
  //   path: "/user",
  //   element: <DefaultLayout />,
  //   children: [
  //     { index: true, element: <User.Dashboard /> },
  //     { path: "home", element: <User.Home /> },
  //   ],
  // },
];
