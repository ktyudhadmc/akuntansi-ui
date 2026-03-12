import Select from "@components/form/default/Select";
import useMapInputOptions from "@hooks/useMapInputOptions";
import useGetAllCompany from "@services/global/company/hooks/useGetAll";

import { setStorageCompany } from "@helpers/index";
import { toast } from "react-toastify";

import { mutate } from "swr";
import Skeleton from "@components/Skeleton/Skeleton";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobalStore from "@store/useStore";

export default function CompanySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useGetAllCompany();
  const companyOptions = useMapInputOptions(data);
  const currentCompany = useGlobalStore((state) => state.currentCompany);
  const currentCompanyLoading = useGlobalStore(
    (state) => state.currentCompanyLoading,
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const role = useGlobalStore((state) => state.role);

  const isOnboard = pathname.includes("onboard");

  const handleSelectCompany = (companyId: string) => {
    setStorageCompany(companyId);
    toast.success("Berhasil memilih perusahaan");
    mutate(() => true);

    // redirect ke dashboard jika berasal dari onboard
    if (isOnboard) {
      const dashboardRoutes = {
        admin: "/admin/dashboard",
        company: "/company/dashboard",
        user: "/user/dashboard",
      };
      navigate(dashboardRoutes[role] ?? "/");
    }

    const safePath = getSafePathAfterCompanySwitch(pathname);

    navigate(safePath || `/${role}/dashboard`);
  };


  /** redirect auto */
  function getSafePathAfterCompanySwitch(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);

    const cleaned: string[] = [];

    for (const seg of segments) {
      const isNumberId = /^\d+$/.test(seg);
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
          seg,
        );

      if (isNumberId || isUuid) break;

      cleaned.push(seg);
    }

    return "/" + cleaned.join("/");
  }

  return (
    <div className="w-xs">
      <Skeleton isLoading={loading || currentCompanyLoading} height="1.75rem">
        <div className="relative z-20 bg-transparent">
          <Select
            placeholder="Pilih Perusahaan"
            className="w-xs !h-fit !py-1"
            value={currentCompany?.id}
            options={companyOptions}
            onChange={(e) => handleSelectCompany(e)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />

          <HiChevronDown
            className={`lg:block hidden absolute top-1/2 right-2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            size={18}
          />
        </div>
      </Skeleton>
    </div>
  );
}
