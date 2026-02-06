import type { ICreatePurchasePayload } from "./request.type";
import type { Purchase } from "./response.type";

export const responseToRequest = (
  purchase: Purchase,
): ICreatePurchasePayload => ({
  document_number: purchase.document_number,
  date: purchase.date,
  due_date: purchase.due_date,
  description: purchase.description ?? "",
  supplier_id: purchase.supplier.id,
  account_id: purchase.account.id,
  items: purchase.items.map(
    ({ material, unit, counter_account, qty, price }) => ({
      material_id: material.id,
      unit_of_measure_id: unit.id,
      counter_account_id: counter_account.id,
      qty,
      price,
    }),
  ),
});
