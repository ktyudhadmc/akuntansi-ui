export interface ICreateSalePayload {
  document_number: string;
  date: string;
  due_date: string;
  account_id: string;
  customer_id: string;
  description: string;
  items: CreateSaleItem[];
}

export interface CreateSaleItem {
  material_id: string | undefined;
  unit_of_measure_id: string | undefined;
  counter_account_id: string | undefined;
  service_type_id: string | undefined;
  qty: number | undefined;
  tax_id?: string | undefined;
  tax_amount: number | undefined;
  price: number | undefined;
}
export interface IImportSalePayload {
  file: File;
}
