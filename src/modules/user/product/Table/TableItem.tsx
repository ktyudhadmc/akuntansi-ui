// import Button from "@components/ui/button/Button";

// import TableItemMenu from "./TableItemMenu";
import type { Product } from "@services/user/product/index/interfaces/response.type";
import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";

interface Props {
  item: Product;
}

export default function TableItem({ item }: Props) {

  const categoryColorMap: Record<string, "primary" | "info" | "success"> = {
    "MEKANIK DAN SPARE PART": "primary",
    "ASSET, INVENTARIS": "info",
    "IT": "success",
  };

  return (
    <tr>
      {/* <td className="px-4 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {nomor}
      </td> */}
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {item.code}
      </td>
      <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <h4 className="font-bold uppercase">{item.name}</h4>
        <p className="text-theme-xs">{item.specification}</p>
      </td>
      <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">

        {item.class && (
          <Badge variant="light" color={categoryColorMap[item.class] ?? "primary"} size="sm">
            {item.class}
          </Badge>
        )}
        {/* <div className="flex gap-2 mt-2">
          {item.is_sellable && (
            <Badge variant="light" color="success">
              Jual
            </Badge>
          )}
          {item.is_stock && (
            <Badge variant="light" color="info">
              Stok
            </Badge>
          )}
        </div> */}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.name} sku={item.code} />
      </td>
    </tr>
  );
}
