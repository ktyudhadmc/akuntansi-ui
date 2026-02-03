import TableItemMenu from "./TableItemMenu";

import type { Production } from "@services/user/production/interfaces/response.type";

interface Props {
  item: Production;
}

export default function TableItem({ item }: Props) {
  // const categoryColorMap: Record<string, "primary" | "info" | "success"> = {
  //   "MEKANIK DAN SPARE PART": "primary",
  //   "ASSET, INVENTARIS": "info",
  //   "IT": "success",
  // };

  const resultProducts = item.items.filter((product) => product.type == "in");
  // const usageProducts = item.items.filter((product) => product.type == "out");

  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {item.date}
      </td>
      <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <p className="text-theme-xs">{item.description}</p>
      </td>
      <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {resultProducts.map((result, index) => (
          <div key={`usage-product-${index}`}>
            <h4 className="font-bold uppercase">{result.material.name}</h4>
            <p className="text-theme-xs">
              {result.qty} {result.unit.name}
            </p>
          </div>
        ))}
      </td>
      {/* <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {usageProducts.map((result, index) => (
          <div key={`usage-product-${index}`}>
            <h4 className="font-bold uppercase">{result.material.name}</h4>
            <p className="text-theme-xs">
              {result.qty} {result.unit.name}
            </p>
          </div>
        ))}
      </td> */}
      {/* <td className="px-4 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.class && (
          <Badge
            variant="light"
            color={categoryColorMap[item.class] ?? "primary"}
            size="sm"
          >
            {item.class}
          </Badge>
        )}
       
      </td> */}
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.description} />
      </td>
    </tr>
  );
}
