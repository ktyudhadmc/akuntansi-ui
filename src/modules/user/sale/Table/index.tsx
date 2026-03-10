import TableFilter from "./Header";
import useGetAll from "@services/user/sale/hooks/useGetAll";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import SaleHeader from "../Header";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";

export default function SaleTable() {
  const { data, loading, setName } = useGetAll();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <>
      {/* header */}
      <SaleHeader
        loading={loading}
        grossRevenue={data?.summary.total_gross ?? 0}
        taxAmount={data?.summary.total_tax ?? 0}
        revenueIncludingTax={data?.summary.total_net ?? 0}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableFilter setSearchCallback={setName} />
          <TableWrapper isSticky>
            <Table>
              <TableHeader isSticky>
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Tanggal
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Nomor
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Pelanggan
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Jenis layanan
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Produk
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Total Harga
                  </TableCell>
                  <th></th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoading colSpan={6} />
                ) : isEmpty(data?.sales) || !data?.sales ? (
                  <TableNotFound colSpan={6} />
                ) : (
                  data.sales.map((item, index) => {
                    return (
                      <TableItem
                        key={`table-sale-${index}`}
                        item={item}
                        openDropdownId={openDropdownId}
                        setOpenDropdownId={setOpenDropdownId}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>
      </div>
    </>
  );
}
