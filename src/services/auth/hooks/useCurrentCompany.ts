import useGetCompany from "@services/global/company/hooks/useGet";

export default function useCurrentCompany(companyId?: string) {
  const { data, loading, error } = useGetCompany(companyId);

  return { data, loading, error };
}
