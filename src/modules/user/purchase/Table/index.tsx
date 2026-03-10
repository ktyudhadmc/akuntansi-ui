import TableFilter from "./Header";
import useGetAll from "@services/user/purchase/hooks/useGetAll";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import PurchaseHeader from "../Header";
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
import { useState } from "react";

export default function PurchaseTable() {
  const { data, loading, setName } = useGetAll();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <>
      <PurchaseHeader
        loading={loading}
        expenseAmount={data?.summary.total_purchase ?? 0}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableFilter setSearchCallback={setName} />
          <TableWrapper isSticky>
            <Table>
              <TableHeader isSticky>
                <TableRow>
                  <TableCell isHeader className="text-start">
                    Tanggal
                  </TableCell>
                  <TableCell isHeader className="text-start">Nomor</TableCell>
                  <TableCell isHeader className="text-start">Supplier</TableCell>
                  <TableCell isHeader className="text-start">Rincian</TableCell>
                  <TableCell isHeader className="text-end !pr-1">
                    Total Harga
                  </TableCell>
                  <th></th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoading colSpan={6} />
                ) : isEmpty(data?.purchases) || !data?.purchases ? (
                  <TableNotFound colSpan={6} />
                ) : (
                  data?.purchases?.map((item, index) => {
                    return (
                      <TableItem
                        key={`table-purchase-${index}`}
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
