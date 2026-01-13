import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "@components/ui/spinner";

import useGlobalStore from "@store/useStore";
import { useLocation, useNavigate } from "react-router-dom";

import { getMe } from "@services/auth/hooks/useGetMe";
import useGetCompany from "@services/user/company/hooks/useGet";

type Props = {
  children: React.ReactNode;
  withoutRedirection?: boolean;
};

export default function AuthMiddleware({
  children,
  withoutRedirection,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const setMe = useGlobalStore((state) => state.setMe);
  const setRole = useGlobalStore((state) => state.setRole);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);
  const setIsSelectCompany = useGlobalStore(
    (state) => state.setIsSelectCompany
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token =
    Cookies.get("token-user") ||
    Cookies.get("token-company") ||
    Cookies.get("token");

  const currentCompany = localStorage.getItem("current-company");

  /** set is loggedIn */
  const isLoggedIn = !!token;
  setIsLoggedIn(!!isLoggedIn);

  /** set is select company */
  const isSelectCompany = !!currentCompany;
  setIsSelectCompany(isSelectCompany);

  const role = Cookies.get("token")
    ? "admin"
    : Cookies.get("token-company")
    ? "company"
    : "user";

  useEffect(() => {
    if (role) {
      getMe(role).then(({ data }) => {
        setMe(data.data);
      });

      // if (currentCompany) {
      //   useGetCompany(currentCompany);
      // }

      setRole(role);
    }
  }, [role, setMe, setRole]);

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

    if (
      [
        "/admin/request",
        "/company/request",
        "/request",
        "/admin/verify",
        "/company/verify",
        "/verify",
      ].includes(pathname)
    ) {
      return;
    }

    if (pathname.startsWith("admin")) {
      navigate("/admin/request");
    } else if (pathname.startsWith("company")) {
      navigate("/company/request");
    } else {
      navigate("/request");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      redirectToLogin();
      setMounted(true);
    } else if (isLoggedIn) {
      if (pathname.includes("request") || pathname.includes("verify")) {
        redirectToDashboard();
      }

      setMounted(true);
    }
  }, [isLoggedIn, pathname]);

  return <>{mounted ? children : <Spinner />}</>;
}
