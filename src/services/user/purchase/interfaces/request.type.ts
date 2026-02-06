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
  material_id: string | undefined;
  unit_of_measure_id: string | undefined;
  counter_account_id: string | undefined;
  qty: number | undefined;
  price: number | undefined;
}

export interface IImportPurchasePayload {
  file: File;
}
