export interface ICreatePurchasePayload {
  account_id: string;
  counter_account_id: string;
  supplier_id: string;
  material_id: string;
  unit_of_measure_id: string;
  document_number: string;
  date: string;
  due_date: string;
  qty: string;
  price: string;
}

export interface IImportPurchasePayload {
  file: File;
}
