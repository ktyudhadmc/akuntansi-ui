import { FaCogs } from "react-icons/fa";

import { useSetCurrentCompany } from "@services/auth/hooks/useSetCurrentCompany";

import useGetAllCompany from "@services/global/company/hooks/useGetAll";
import Skeleton from "@components/Skeleton/Skeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OnBoard() {
  const navigate = useNavigate();
  const { setCompany } = useSetCurrentCompany();

  const { data, loading } = useGetAllCompany();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {loading || !data
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={`skeleton-onboard-company${idx}`}
                isLoading={loading}
                height="5rem"
              />
            ))
          : data?.map((item, idx) => (
              // <div
              //   key={`onboard-company-${idx}`}
              //   className={`border border-brand-600 rounded-lg pt-4 cursor-pointer`}
              //   onClick={() => {
              //     setCompany(item.id.toString());
              //     toast.success("Berhasil memilih perusahaan");
              //     navigate("/user/dashboard");
              //   }}
              // >
              //   <h4 className="px-4 mb-4 text-sm dark:text-white font-semibold ">
              //     {item.name}
              //   </h4>

              //   <div className="bg-brand-600 w-full rounded-b py-1 text-end flex justify-between">
              //     <p className="text-xs font-semibold text-white px-4 my-auto">
              //       {item.code}
              //     </p>
              //     <span className="text-sm text-white px-2">
              //       <HiChevronRight
              //         className="bg-white rounded-full"
              //         color={"var(--color-brand-600)"}
              //       />
              //     </span>
              //   </div>
              // </div>

              <div
                key={`onboard-company-${idx}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
                onClick={() => {
                  setCompany(item.id.toString());
                  toast.success("Berhasil memilih perusahaan");
                  navigate("/user/dashboard");
                }}
              >
                <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <FaCogs className="text-xl" />
                </div>

                <p className="text-theme-sm text-gray-500 dark:text-gray-400">
                  {item.code}
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-sm font-bold text-gray-800 dark:text-white/90">
                      {item.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
