import config from "@constants/config";
import { HiPhone } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function SidebarWidget() {
  const message = `Halo Developer ${config.APP_NAME}, Saya Mau Konsultasi.`;
  const whatsapp = `https://api.whatsapp.com/send?phone=${config.OFFICE_WHATSAPP}&text=${message}`;

  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Dinamika <span className="italic text-[10px] font-light">Jurnal</span>
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Jurnal — Biar Laporan Nggak Pakai Perasaan.
      </p>

      <NavLink
        to={whatsapp}
        target="_blank"
        className={`flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600`}
        onClick={(e) => {
          e.preventDefault();

          // Ukuran window baru
          const width = 800;
          const height = 600;

          // Hitung posisi supaya muncul di tengah
          const left = (window.screen.width - width) / 2;
          const top = (window.screen.height - height) / 2;

          window.open(
            whatsapp,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
          );
        }}
      >
        <HiPhone className="mr-2" /> Hubungi kami
      </NavLink>
    </div>
  );
}
