import type { ICreateSalePayload } from "./request.type";
import type { Sale } from "./response.type";

export const responseToRequest = (sale: Sale): ICreateSalePayload => ({
  document_number: sale.document_number,
  date: sale.date,
  due_date: sale.due_date,
  description: sale.description ?? "",
  customer_id: sale.customer.id,
  account_id: sale.account.id,
  items: sale.items.map(
    ({
      material,
      unit,
      counter_account,
      service_type,
      qty,
      price,
      tax,
      tax_amount,
    }) => ({
      material_id: material.id,
      unit_of_measure_id: unit.id,
      counter_account_id: counter_account.id,
      service_type_id: service_type.id,
      tax_id: tax.id,
      qty,
      price,
      tax_amount,
    }),
  ),
});
