export interface ICreateSalePayload {
  account_id: string;
  counter_account_id: string;
  customer_id: string;
  material_id: string;
  unit_of_measure_id: string;
  document_number: string;
  service_type_id: string;
  date: string;
  due_date: string;
  qty: string;
  price: string;
}

export interface IImportSalePayload {
  file: File;
}
