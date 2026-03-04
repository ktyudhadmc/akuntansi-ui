import { removeStorageCompany } from "@helpers/storage";
import useGlobalStore from "@store/useStore";

export function useUnsetCurrentCompany() {
  const setCurrentCompany = useGlobalStore((state) => state.setCurrentCompany);
  const unsetCompany = async () => {
    setCurrentCompany(null);
    /** set localstorage */
    removeStorageCompany();
  };

  return { unsetCompany };
}
