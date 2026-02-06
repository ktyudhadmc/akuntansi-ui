export interface ICreatePurchasePayload {
  document_number: string;
  account_id: string;
  supplier_id: string;
  date: string;
  due_date: string;
  description: string;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  material_id: string;
  unit_of_measure_id: string;
  counter_account_id: string;
  qty: number | null;
  price: number | null;
}

export interface IImportPurchasePayload {
  file: File;
}
