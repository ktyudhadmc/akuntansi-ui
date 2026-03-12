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
import { HiOutlineHomeModern, HiOutlineChevronDown } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
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
  { icon: <HiOutlineViewList />, name: "Daftar Lainnya", path: "/user/others" },
];

export default function NavBar() {
  const location = useLocation();
  const navRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const [visibleCount, setVisibleCount] = useState(navItems.length);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = useCallback(
    (path: string) => location.pathname.startsWith(path),
    [location.pathname],
  );

  const currentCompany = useGlobalStore((state) => state.currentCompany);

  // Hitung berapa item yang muat
  useEffect(() => {
    const calculate = () => {
      const nav = navRef.current;
      if (!nav) return;

      const navWidth = nav.parentElement!.offsetWidth;
      const MORE_BUTTON_WIDTH = 110; // estimasi lebar tombol "Lainnya"
      const GAP = 16; // gap-4

      // Ukur lebar tiap item
      const items = Array.from(nav.children) as HTMLElement[];
      let usedWidth = 0;
      let count = 0;

      for (const item of items) {
        const itemWidth = item.offsetWidth + GAP;
        if (usedWidth + itemWidth + MORE_BUTTON_WIDTH > navWidth) break;
        usedWidth += itemWidth;
        count++;
      }

      // Kalau semua muat, tidak perlu tombol "Lainnya"
      setVisibleCount(count === navItems.length ? navItems.length : count);
    };

    // Jalankan setelah render
    const timeout = setTimeout(calculate, 50);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculate);
    };
  }, []);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup dropdown saat navigasi
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  if (!currentCompany) return null;

  const visibleItems = navItems.slice(0, visibleCount);
  const hiddenItems = navItems.slice(visibleCount);
  const hasHidden = hiddenItems.length > 0;
  const isMoreActive = hiddenItems.some(
    (item) => item.path && isActive(item.path),
  );

  return (
    <nav
      className="sticky top-[63px] py-2 px-5 bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b hidden lg:block"
      style={{ zIndex: 50 }}
    >
      <ul ref={navRef} className="flex gap-4 items-center">
        {visibleItems.map(
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

        {/* Tombol "Lainnya" + Dropdown */}
        {hasHidden && (
          <li className="shrink-0 relative" ref={moreRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`menu-dropdown-item ${
                isMoreActive
                  ? "menu-dropdown-item-active"
                  : "menu-dropdown-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isMoreActive
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                <HiOutlineViewList />
              </span>
              <span className="menu-item-text">Lainnya</span>
              <HiOutlineChevronDown
                className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg  py-1"
                style={{ zIndex: 100001 }}
              >
                {hiddenItems.map(
                  (nav, index) =>
                    nav.path && (
                      <Link
                        key={index}
                        to={nav.path}
                        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                          isActive(nav.path)
                            ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="w-4 h-4">{nav.icon}</span>
                        {nav.name}
                      </Link>
                    ),
                )}
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
