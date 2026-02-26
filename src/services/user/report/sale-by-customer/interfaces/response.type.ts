import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportSaleByCustomerResponse {
  data: SaleByCustomer[];
  pagination: Pagination;
}

export interface SaleByCustomer {
  id: number;
  name: string;
  sub_total: number;
  transactions: SaleByCustomerTransaction[];
}

export interface SaleByCustomerTransaction {
  id: number;
  transaction_date: Date;
  transaction_type: TransactionType;
  product: Product;
  unit: Unit;
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
