import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetAllTransactionResponse {
  status?: string;
  message?: string;
  data: Transaction[];
  pagination: Pagination;
}

export interface Transaction {
  reference_id: number;
  reference_type: string;
  transaction_date: Date;
  transaction_due_date: Date;
  transaction_number: string;
  contact: Contact;
  type: string;
  status: string;
  amount: number;
  remaining: number;
  description: string;
}

interface Contact {
  id: number;
  name: string;
}
