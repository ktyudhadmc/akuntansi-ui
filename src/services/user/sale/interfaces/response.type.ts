export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Sale[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Sale;
}

export interface Sale {
  id: string;
  document_number: string;
  date: string;
  due_date: string;
  customer: Customer;
  account: Account;
  total_gross: number;
  total_tax: number;
  total_net: number;
  description: string;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  qty: number;
  price: number;
  gross_amount: number;
  tax_amount: number;
  net_amount: number;
  material: Product;
  unit: Unit;
  service_type: ProductKind;
  counter_account: Account;
  tax: Tax;
}
export interface SaleOld {
  id: string;
  contact: Contact;
  customer: Customer;
  debit_account: Account;
  credit_account: Account;
  transaction_number: string;
  transaction_date: Date;
  payment_due_date: Date;
  paid_at: Date;
  status: string;
  amount: number;
  sale_items: SaleItemOld[];
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
}
interface Contact {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Account {
  id: string;
  code: string;
  name: string;
}

interface SaleItemOld {
  id: string;
  product: Product;
  quantity: string;
  price: string;
  delivered_number: string;
  delivered_date: Date;
  units: Unit[];
}

interface Product {
  id: string;
  code: string;
  name: string;
}
interface ProductKind {
  id: string;
  name: string;
}

interface Unit {
  id: string;
  name: string;
}
