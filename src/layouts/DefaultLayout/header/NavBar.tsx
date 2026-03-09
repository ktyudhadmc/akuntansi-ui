// import { useState, useRef, useEffect } from "react";
import { HiOutlineCube } from "react-icons/hi";
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
import { Link } from "react-router-dom";

const navItems = [
  { icon: GridIcon, name: "Beranda", path: "/user/dashboard" },
  { icon: MdOutlineShowChart, name: "Laporan", path: "/user/reports" },
  { icon: AiOutlineBank, name: "Kas & Bank", path: "/user/accounts/cash-bank" },
  { icon: MdOutlineSell, name: "Penjualan", path: "/user/sales" },
  { icon: MdOutlineShoppingCart, name: "Pembelian", path: "/user/purchases" },
  { icon: MdOutlineInventory, name: "Persediaan", path: "/user/inventories" },
  { icon: MdOutlineContacts, name: "Kontak", path: "/user/contacts" },
  { icon: HiOutlineCube, name: "Material", path: "/user/products" },
  { icon: MdOutlineInventory2, name: "Produksi", path: "/user/productions" },
  { icon: HiOutlineHomeModern, name: "Aset", path: "/user/assets" },
  {
    icon: MdOutlineReceiptLong,
    name: "Daftar Akun",
    path: "/user/accounts/chart-of-account",
  },
];

export default function NavBar() {
  //   const [activePath, setActivePath] = useState("/user/dashboard");
  //   const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <nav className="h-10 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center px-5 gap-2 z-99999">
        <ul className="flex gap-4 items-center mx-auto">
          {navItems.map((nav, index) => (
            <li key={index}>
              <Link className="menu-item group cursor-pointer" to={nav.path}>
                <span className="menu-item-text">{nav.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
