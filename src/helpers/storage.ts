import config from "@constants/config";

export const setStorageCompany = (companyId: string) => {
  localStorage.setItem(config.LOCAL_STORAGE_COMPANY_KEY, companyId);
  window.dispatchEvent(new Event("storage")); // trigger AuthMiddleware
};

export const removeStorageCompany = () => {
  localStorage.removeItem(config.LOCAL_STORAGE_COMPANY_KEY);
  window.dispatchEvent(new Event("storage"));
};
