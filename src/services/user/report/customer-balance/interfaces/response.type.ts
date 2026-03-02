import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportCustomerBalance {
  status?: string;
  message?: string;
  data: CustomerBalance[];
  pagination: Pagination;
}

export interface CustomerBalance {
  id: number;
  name: string;
  transaction: CustomerBalanceTransaction[];
}

export interface CustomerBalanceTransaction {
  id: number;
  transaction_date: Date;
  due_date: Date;
  invoice_number: string;
  description: string;
  amount: number;
  remaining: number;
}
