import { HiOutlineCube, HiOutlineViewList } from "react-icons/hi";
import { AiOutlineBank } from "react-icons/ai";
import {
  MdOutlineSell,
  MdOutlineShoppingCart,
  MdOutlineContacts,
  MdOutlineShowChart,
  MdOutlineInventory,
  MdOutlineInventory2,
  MdOutlineReceiptLong,
} from "react-icons/md";

import { GridIcon } from "@assets/icons";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useCallback } from "react";
import useGlobalStore from "@store/useStore";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Beranda", path: "/user/dashboard" },
  { icon: <MdOutlineShowChart />, name: "Laporan", path: "/user/reports" },
  {
    icon: <AiOutlineBank />,
    name: "Kas & Bank",
    path: "/user/accounts/cash-bank",
  },
  { icon: <MdOutlineSell />, name: "Penjualan", path: "/user/sales" },
  {
    icon: <MdOutlineShoppingCart />,
    name: "Pembelian",
    path: "/user/purchases",
  },
  {
    icon: <MdOutlineInventory />,
    name: "Persediaan",
    path: "/user/inventories",
  },
  { icon: <MdOutlineContacts />, name: "Kontak", path: "/user/contacts" },
  { icon: <HiOutlineCube />, name: "Material", path: "/user/products" },
  {
    icon: <MdOutlineInventory2 />,
    name: "Produksi",
    path: "/user/productions",
  },
  { icon: <HiOutlineHomeModern />, name: "Aset", path: "/user/assets" },
  {
    icon: <MdOutlineReceiptLong />,
    name: "Daftar Akun",
    path: "/user/accounts/chart-of-account",
  },
  {
    icon: <HiOutlineViewList />,
    name: "Daftar Lainnya",
    path: "/user/others",
  },
];

export default function NavBar() {
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname.startsWith(path),
    [location.pathname],
  );

  const currentCompany = useGlobalStore((state) => state.currentCompany);

  if (!currentCompany) return;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <nav className="sticky top-[63px] py-2 px-5 bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b hidden lg:block overflow-x-auto custom-scrollbar">
        <ul className="flex gap-4 w-max min-w-full justify-center">
          {navItems.map(
            (nav, index) =>
              nav.path && (
                <li key={index} className="shrink-0">
                  <Link
                    className={`menu-dropdown-item ${
                      isActive(nav.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                    }`}
                    to={nav.path}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    <span className="menu-item-text">{nav.name}</span>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </nav>
    </>
  );
}
