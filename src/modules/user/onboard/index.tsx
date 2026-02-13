import { useSetCurrentCompany } from "@services/auth/hooks/useSetCurrentCompany";

import useGetAllCompany from "@services/global/company/hooks/useGetAll";
import Skeleton from "@components/Skeleton/Skeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AvatarText from "@components/ui/avatar/AvatarText";
import { HiArrowRight } from "react-icons/hi";

export default function OnBoard() {
  const navigate = useNavigate();
  const { setCompany } = useSetCurrentCompany();

  const { data, loading } = useGetAllCompany();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3">
        {loading || !data
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={`skeleton-onboard-company${idx}`}
                isLoading={loading}
                height="10rem"
              />
            ))
          : data?.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
              >
                <div className="relative p-5 pb-4 flex gap-4">
                  <div className="mb-2">
                    <AvatarText text={item.name} size="12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      {item.name}
                    </h3>

                    <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
                      {item.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 px-5 py-2.5 dark:border-gray-800">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCompany(item.id.toString());
                        toast.success("Berhasil memilih perusahaan");
                        navigate("/user/dashboard");
                      }}
                      className="shadow-theme-xs inline-flex h-11 items-center justify-center rounded-lg border border-brand-600 pl-4 pr-2 py-3 text-sm font-medium text-brand-600 dark:border-gray-700 dark:text-gray-400 hover:bg-brand-600 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-700 animation ease-in-out duration-100"
                    >
                      Buka Jurnal
                      <HiArrowRight className="rounded bg-brand-100 text-brand-600 dark:bg-gray-700 dark:text-gray-400 text-2xl p-1 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
