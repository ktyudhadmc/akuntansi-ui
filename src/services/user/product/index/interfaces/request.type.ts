export interface ICreateProductPayload {
  product_category_id: string;
  name: string;
  description: string;
  type: string;
  is_purchasable: boolean;
  is_sellable: boolean;
  is_stock: boolean;
  unit_id: string;
  product_units: ProductUnit[];
}

interface ProductUnit {
  unit_id: number;
  conversion: number;
}
