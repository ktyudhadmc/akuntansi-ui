import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";
// import TableItem from "./TableItem";
// import useGetAll from "@services/user/supplier/hooks/useGetAll";
// import TableHeader from "./TableHeader";

// import type { Product } from "@services/user/product/index/interfaces/response.type";
import TableItem from "./TableItem";
import TableHeader from "./Header";
import useGetAll from "@services/user/product/index/hooks/useGetAll";

export default function ProductTable() {
  // const data: Product[] = [
  //   {
  //     id: 1,
  //     sku: "32000845",
  //     name: "BUSHING TEFLON TYPE SKA",
  //     description: "ID 20MM OD 38MM TINGGI 24,15MM ",
  //     type: "stock",
  //     is_purchasable: true,
  //     is_sellable: true,
  //     is_stock: true,
  //     product_category: {
  //       id: 1,
  //       name: "MEKANIK DAN SPARE PART",
  //     },
  //     units: null,
  //   },
  //   {
  //     id: 2,
  //     sku: "32000845",
  //     name: "BUSHING TEFLON TYPE SKA",
  //     description: "ID 20MM OD 38MM TINGGI 24,15MM ",
  //     type: "stock",
  //     is_purchasable: true,
  //     is_sellable: true,
  //     is_stock: true,
  //     product_category: {
  //       id: 1,
  //       name: "MEKANIK DAN SPARE PART",
  //     },
  //     units: null,
  //   },
  // ];

  const { data, loading, setName, setCategory } = useGetAll();

  return (
    <>
      <TableHeader
        setSearchCallback={setName}
        setCategoryCallback={setCategory}
      />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kategori
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Spesifikasi
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data?.map((item, index) => {
                  return (
                    <TableItem key={`table-product-${index}`} item={item} />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
