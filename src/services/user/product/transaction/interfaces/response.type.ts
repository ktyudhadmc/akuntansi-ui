import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetProductTransactionResponse {
  status?: string;
  message?: string;
  data: ProductTransaction[];
  pagination: Pagination;
}

export interface ProductTransaction {
  id: number;
  reference_type: string;
  transaction_date: Date;
  transaction_number: string;
  unit: Unit;
  quanity: number;
}

interface Unit {
  id: number;
  name: string;
}
