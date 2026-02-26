import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportSaleByCustomerResponse {
  summary: SaleByCustomerSummary;
  data: SaleByCustomer[];
  pagination: Pagination;
}

export interface SaleByCustomer {
  id: number;
  name: string;
  sub_total: number;
  transactions: SaleByCustomerTransaction[];
}

export interface SaleByCustomerSummary {
  grand_total: number;
}
export interface SaleByCustomerTransaction {
  id: number;
  transaction_number: string;
  transaction_date: Date;
  transaction_type: TransactionType;
  product: Product;
  unit: Unit;
  quantity: number;
  description: string;
  price: number;
  amount: number;
  total: number;
}

interface TransactionType {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
}
