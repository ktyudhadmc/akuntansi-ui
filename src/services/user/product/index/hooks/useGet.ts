import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type {
  IGetResponse,
  ProductUnit,
  Unit,
} from "../interfaces/response.type";

export default function useGetProduct(productId: string) {
  const fetcher: Fetcher<IGetResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/material/${productId}`, fetcher);

  const dummyUnit: Unit = { id: 1, name: "Pcs" };
  const dummyUnits: ProductUnit[] = [
    { id: 2, conversion: 12, unit: { id: 2, name: "Lusin" } },
    { id: 3, conversion: 144, unit: { id: 3, name: "Gross" } },
  ];

  return {
    loading: !data && !error,
    data: data?.data
      ? { ...data.data, unit: dummyUnit, units: dummyUnits }
      : undefined,
    error,
  };
}
