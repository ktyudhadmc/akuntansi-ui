import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportSaleListResponse {
  summary: SaleListSummary;
  data: SaleList[];
  pagination: Pagination;
}

export interface SaleList {
  id: number;
  transaction_number: string;
  transaction_date: Date;
  transaction_type: TransactionType;
  transaction_status: TransactionStatus;
  customer: Customer;
  note: string;
  description: string;
  original_amount: number;
  total_paid: number;
  balance_due: number;
}

interface TransactionType {
  id: number;
  name: string;
}
interface TransactionStatus {
  id: number;
  name: string;
}

interface Customer {
  id: number;
  name: string;
}

export interface SaleListSummary {
  original_amount: number;
  total_paid: number;
  balance_due: number;
}
