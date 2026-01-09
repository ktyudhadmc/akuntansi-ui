import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import useGlobalStore from "@store/useStore";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  withoutRedirection?: boolean;
};

export default function AuthMiddleware({
  children,
  withoutRedirection,
}: Props) {
  const [mounted, setMounted] = useState(false);
  // const setMe = useGlobalStore((state) => state.setMe);
  const setRole = useGlobalStore((state) => state.setRole);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token =
    Cookies.get("token-user") ||
    Cookies.get("token-company") ||
    Cookies.get("token");

  /** set is loggedIn */
  const isLoggedIn = !!token;
  setIsLoggedIn(!!isLoggedIn);

  const role = Cookies.get("token")
    ? "admin"
    : Cookies.get("token-company")
    ? "company"
    : "user";

  useEffect(() => {
    if (role) {
      // getMe(role).then(({ data }) => {
      //   setMe(data.data as User);
      // });

      setRole(role);
    }
  }, [role, setRole]);

  const redirectToDashboard = () => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "company":
        navigate("/company/dashboard");
        break;
      case "user":
        navigate("/user/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const redirectToLogin = () => {
    if (withoutRedirection) {
      setMounted(true);
      return;
    }

    if (["/admin/login", "/company/login", "/login"].includes(pathname)) {
      return;
    }

    if (pathname.startsWith("admin")) {
      navigate("/admin/login");
    } else if (pathname.startsWith("company")) {
      navigate("/company/login");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      redirectToLogin();
      setMounted(true);
    } else if (isLoggedIn) {
      if (pathname.includes("login")) {
        redirectToDashboard();
      }

      setMounted(true);
    }
  }, [isLoggedIn, pathname]);

  return <>{mounted ? children : <>Loading...</>}</>;
}
