import config from "@constants/config";
import useGetCompany from "@services/global/company/hooks/useGet";
import useGlobalStore from "@store/useStore";
import { useEffect } from "react";

export default function useCurrentCompany(companyId: string) {
  const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);

  const { data, loading, error } = useGetCompany(companyId);

  useEffect(() => {
    if (!data) return;
    setCurrentCompany(data);

    /** simpan company */
    localStorage.setItem(config.LOCAL_STORAGE_COMPANY_KEY, data.id.toString());
  }, [data, setCurrentCompany]);

  return { data, loading, error };
}
