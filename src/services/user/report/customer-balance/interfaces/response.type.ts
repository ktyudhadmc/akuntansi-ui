// import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";
export interface IGetReportCustomerBalance {
  status?: string;
  message?: string;
  data: CustomerBalance[];
}
export interface CustomerBalance {
  unit: string;
  saldo_awal: number;
  pendapatan: number;
  estimasi_pph_23: number;
  pembayaran: number;
  saldo_akhir: number;
}

// export interface IGetReportCustomerBalance {
//   status?: string;
//   message?: string;
//   data: CustomerBalance[];
//   summary: CustomerBalanceSummary;
//   pagination: Pagination;
// }

// export interface CustomerBalance {
//   id: number;
//   name: string;
//   total_amount: number;
//   total_remaining: number;
//   transaction: CustomerBalanceTransaction[];
// }

// export interface CustomerBalanceTransaction {
//   id: number;
//   transaction_date: Date;
//   due_date: Date;
//   invoice_number: string;
//   description: string;
//   amount: number;
//   remaining: number;
// }

// export interface CustomerBalanceSummary {
//   total_amount: number;
//   total_remaining: number;
// }
