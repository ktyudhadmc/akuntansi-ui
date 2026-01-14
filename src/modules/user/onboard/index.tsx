import { HiChevronRight } from "react-icons/hi";

import { useSetCurrentCompany } from "@services/auth/hooks/useSetCurrentCompany";

import useGetAllCompany from "@services/global/company/hooks/useGetAll";
import Skeleton from "@components/Skeleton/Skeleton";

export default function OnBoard() {
  const { setCompany } = useSetCurrentCompany();

  const { data, loading } = useGetAllCompany();

  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-2 gap-4">
        {loading || !data
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={`skeleton-onboard-company${idx}`}
                isLoading={loading}
                height="5rem"
              />
            ))
          : data?.map((item, idx) => (
              <div
                key={`onboard-company-${idx}`}
                className={`border border-brand-600 rounded-lg pt-4 cursor-pointer`}
                onClick={() => setCompany(item.id.toString())}
              >
                <h4 className="px-4 mb-4 text-sm dark:text-white font-semibold ">
                  {item.name}
                </h4>

                <div className="bg-brand-600 w-full rounded-b py-1 text-end flex justify-between">
                  <p className="text-xs font-semibold text-white px-4 my-auto">
                    {item.code}
                  </p>
                  <span className="text-sm text-white px-2">
                    <HiChevronRight
                      className="bg-white rounded-full"
                      color={"var(--color-brand-600)"}
                    />
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
