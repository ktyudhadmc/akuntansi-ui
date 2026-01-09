import { Link } from "react-router";
import PageMeta from "@components/common/PageMeta";

export default function ComingSoon() {
  return (
    <>
      <PageMeta title="Segera Hadir" />
      <div className="relative z-1 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6">
        <div className="mx-auto w-full max-w-[460px] text-center">
          <Link to="/" className="mb-6 inline-block">
            <h1 className="mb-2 font-semibold text-[#465FFF] text-title-sm dark:text-white/90 sm:text-title-md">
              Akuntansi
              <span className="text-sm italic font-normal"> by DMC</span>
            </h1>
          </Link>

          <h1 className="text-title-md xl:text-title-xl mb-3 font-bold text-gray-800 dark:text-white/90">
            Segera Hadir
          </h1>
          <p className="mb-9 text-base text-gray-500 dark:text-gray-400">
            Halaman ini sedang dalam tahap pengembangan dan akan segera
            tersedia.
          </p>

          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Coba Masuk Akun
          </Link>
        </div>
      </div>
    </>
  );
}
