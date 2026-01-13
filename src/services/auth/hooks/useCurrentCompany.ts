import useGetCompany from "@services/user/company/hooks/useGet";
import useGlobalStore from "@store/useStore";

export default function useCurrentCompany(companyId: string) {
  const currentCompanyName = "current-company";
  const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);

  const { data: dataCompany, loading, error } = useGetCompany(companyId);

  if (dataCompany) {
    setCurrentCompany(dataCompany);

    /** simpan company */
    localStorage.setItem(currentCompanyName, dataCompany.id);
  }

  return { data: dataCompany, loading, error };
}
