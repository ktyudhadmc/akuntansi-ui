import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportExpenseDetailResponse {
  summary: ExpenseDetailSummary;
  data: ExpenseDetail[];
  pagination: Pagination;
}

export interface ExpenseDetail {
  id: number;
  code: string;
  name: string;
  sub_total: number;
  transactions: ExpenseDetailTransaction[];
}

export interface ExpenseDetailSummary {
  total_amount: number;
  total_remaining: number;
  total_tax: number;
}

export interface ExpenseDetailTransaction {
  reference_id: number;
  reference_type: string;
  transaction_date: Date;
  transaction_number: string;
  transaction_status: TransactionStatus;

  description: string;
  supplier: Supplier;

  tax: number;
  amount: number;
  remaining: number;
}

interface Supplier {
  id: number;
  name: string;
}

interface TransactionStatus {
  id: number;
  name: string;
}
