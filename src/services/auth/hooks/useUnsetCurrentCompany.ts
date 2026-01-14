import config from "@constants/config";
import useGlobalStore from "@store/useStore";

export function useUnsetCurrentCompany() {
    const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);
    const unsetCompany = async () => {
        setCurrentCompany(null);
        /** set localstorage */
        localStorage.removeItem(config.LOCAL_STORAGE_COMPANY_KEY);
    };

    return { unsetCompany };
}
