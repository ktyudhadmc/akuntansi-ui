export type ProductUsageType = "in" | "out";

export interface ICreateProductionPayload {
  date: string;
  description: string;
  items: ProductUsage[];
}

export interface ProductUsage {
  material_id: string;
  unit_of_measures_id: string;
  qty: number;
  type: ProductUsageType;
}

export interface ProductUsageUpdate {
  material: Product;
  unit: Unit;
  qty: number;
  type: ProductUsageType;
}

export interface Product {
  id: string;
  name?: string;
}

export interface Unit {
  id: string;
  name?: string;
}

export interface IImportPayload {
  file: File;
}
