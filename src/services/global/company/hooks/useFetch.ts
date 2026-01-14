import axiosInstance from "@/lib/axios-instance";
import type { Company } from "@services/global/company/interfaces/response.type";


export async function useFetchCompany(companyId: string) {
  const { data } = await axiosInstance({
    withToken: true,
    tokenType: "user",
  }).get(`/company/${companyId}`);

  return { data: data as Company, error: null };
}