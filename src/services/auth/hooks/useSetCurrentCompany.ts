import config from "@constants/config";
import { useFetchCompany } from "@services/global/company/hooks/useFetch";
import useGlobalStore from "@store/useStore";

export function useSetCurrentCompany() {
    const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);

    const setCompany = async (companyId: string) => {
        const company = await useFetchCompany(companyId);
        setCurrentCompany(company.data);

        /** set localstorage */
        localStorage.setItem(config.LOCAL_STORAGE_COMPANY_KEY, companyId.toString());
    };

    return { setCompany };
}
