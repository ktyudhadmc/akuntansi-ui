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
  contact: Contact;
  supplier: Supplier;
  debit_account: Account;
  credit_account: Account;
  transaction_number: string;
  transaction_date: Date;
  payment_due_date: Date;
  paid_at: Date;
  status: string;
  amount: number;
  sale_items: SaleItem[];
}

interface Contact {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface Account {
  id: string;
  code: string;
  name: string;
}

interface SaleItem {
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

interface Unit {
  id: string;
  name: string;
}
