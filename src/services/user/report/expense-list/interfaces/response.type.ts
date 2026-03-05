import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportExpenseListResponse {
  summary: ExpenseListSummary;
  data: ExpenseList[];
  pagination: Pagination;
}

export interface ExpenseListSummary {
  total_amount: number;
  total_remaining: number;
  total_tax: number;
}

export interface ExpenseList {
  reference_id: number;
  reference_type: string;
  transaction_date: Date;
  transaction_number: string;
  transaction_status: TransactionStatus;

  account: Account;

  description: string;
  supplier: Supplier;

  tax: number;
  amount: number;
  remaining: number;
}

interface Account {
  id: number;
  code: string;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

interface TransactionStatus {
  id: number;
  name: string;
}
