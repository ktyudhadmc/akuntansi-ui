import config from "@constants/config";
import { useFetchCompany } from "@services/global/company/hooks/useFetch";
import useGlobalStore from "@store/useStore";

export function useSetCurrentCompany() {
  const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);
  const setIsSelectCompany = useGlobalStore(
    (state) => state.setIsSelectCompany
  );

  const setCompany = async (companyId: string) => {
    const storageCompany = localStorage.getItem(
      config.LOCAL_STORAGE_COMPANY_KEY
    );

    /** harus unset dulu baru bisa ganti */
    if (storageCompany === companyId) return;

    const company = await useFetchCompany(companyId);
    if (!company) return;

    setCurrentCompany(company.data);
    setIsSelectCompany(true);

    /** set localstorage */
    localStorage.setItem(
      config.LOCAL_STORAGE_COMPANY_KEY,
      companyId.toString()
    );
  };

  return { setCompany };
}
