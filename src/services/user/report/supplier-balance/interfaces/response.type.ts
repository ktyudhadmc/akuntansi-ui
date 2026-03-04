import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportSupplierBalance {
  status?: string;
  message?: string;
  data: SupplierBalance[];
  summary: SupplierBalanceSummary;
  pagination: Pagination;
}

export interface SupplierBalance {
  id: number;
  name: string;
  total_amount: number;
  total_remaining: number;
  transaction: SupplierBalanceTransaction[];
}

export interface SupplierBalanceTransaction {
  id: number;
  transaction_date: Date;
  due_date: Date;
  invoice_number: string;
  description: string;
  amount: number;
  remaining: number;
}

export interface SupplierBalanceSummary {
  total_amount: number;
  total_remaining: number;
}
