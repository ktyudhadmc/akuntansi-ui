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
  document_number: string;
  date: string;
  due_date: string;
  total_amount: number;
  description: string;
  supplier: Supplier;
  account: Account;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  material: Product;
  unit: Unit;
  qty: number;
  price: number;
  subtotal: number;
  counter_account: Account;
}

// BELUM DIPAKE
// export interface PurchaseOld {
//   id: string;
//   purchase_category: PurchaseCategory;
//   supplier: Supplier;
//   debit_account: Account;
//   credit_account: Account;
//   purchase_order_number: string;
//   purchase_order_date: Date;
//   transaction_number: string;
//   transaction_date: Date;
//   payment_due_date: Date;
//   invoice_date: Date;
//   paid_at: Date;
//   status: string;
//   amount: number;
//   purchase_items: PurchaseItemOld[];
// }

// interface PurchaseItemOld {
//   id: string;
//   product: Product;
//   quantity: string;
//   price: string;
//   receive_number: string;
//   received_date: Date;
//   received_by: ReceivedBy;
// }

// interface PurchaseCategory {
//   id: string;
//   name: string;
// }

// interface ReceivedBy {
//   id: string;
//   name: string;
// }

interface Supplier {
  id: string;
  name: string;
}

interface Account {
  id: string;
  code: string;
  name: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  unit?: string;
}

interface Unit {
  id: string;
  name: string;
}
