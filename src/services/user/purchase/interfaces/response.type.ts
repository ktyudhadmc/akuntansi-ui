export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Purchase[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Purchase;
}

export interface Purchase {
  id: string;
  purchase_category: PurchaseCategory;
  supplier: Supplier;
  account: Account;
  material: Product;
  unit: Unit;
  qty: number;
  price: number;
  total_price: number;
  date: string;
  due_date: string;
  document_number: string;
}
export interface PurchaseOld {
  id: string;
  purchase_category: PurchaseCategory;
  supplier: Supplier;
  debit_account: Account;
  credit_account: Account;
  purchase_order_number: string;
  purchase_order_date: Date;
  transaction_number: string;
  transaction_date: Date;
  payment_due_date: Date;
  invoice_date: Date;
  paid_at: Date;
  status: string;
  amount: number;
  purchase_items: PurchaseItem[];
}

interface PurchaseCategory {
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

interface PurchaseItem {
  id: string;
  product: Product;
  quantity: string;
  price: string;
  receive_number: string;
  received_date: Date;
  received_by: ReceivedBy;
}

interface Product {
  id: string;
  code: string;
  name: string;
  unit?: string;
}

interface ReceivedBy {
  id: string;
  name: string;
}

interface Unit {
  id: string;
  name: string;
}
