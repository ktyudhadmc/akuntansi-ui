import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetReportPurchaseBySupplierResponse {
  summary: PurchaseBySupplierSummary;
  data: PurchaseBySupplier[];
  pagination: Pagination;
}

export interface PurchaseBySupplier {
  id: number;
  name: string;
  sub_total: number;
  transactions: PurchaseBySupplierTransaction[];
}

export interface PurchaseBySupplierSummary {
  grand_total: number;
}
export interface PurchaseBySupplierTransaction {
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
