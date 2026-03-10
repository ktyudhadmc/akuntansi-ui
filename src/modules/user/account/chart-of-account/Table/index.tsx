import TableItem from "./TableItem";
import TableFilter from "./TableHeader";

import useGetAll from "@services/user/account/index/hooks/useGetAll";
import { isEmpty } from "lodash";

import Checkbox from "@components/form/default/Checkbox";
import { useBulkSelect } from "@hooks/useBulkSelect";
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

export default function AccountTable() {
  const { data, loading, setName } = useGetAll();

  const { selectedIds, isSelected, toggleOne, toggleAll, isAllSelected } =
    useBulkSelect<number>();

  const allIds =
    data?.filter((item) => item.is_posting).map((item) => item.id) ?? [];

  console.log(selectedIds);
  return (
    <>
      <TableFilter
        setSearchCallback={(e) => setName(e)}
        selectedIds={selectedIds}
      />
      <TableWrapper isSticky>
        <Table>
          {/* Table Header */}
          <TableHeader isSticky>
            <TableRow>
              <th className="pl-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 flex gap-4">
                <Checkbox
                  className="cursor-pointer"
                  checked={isAllSelected(allIds)}
                  onChange={() => toggleAll(allIds)}
                />
              </th>
              <TableCell isHeader className="text-start">
                Kunci
              </TableCell>
              <TableCell isHeader className="text-start">
                Kode akun
              </TableCell>
              <TableCell isHeader className="text-start">
                Nama akun
              </TableCell>
              <TableCell isHeader className="text-end">
                Saldo bank
              </TableCell>
              <TableCell isHeader className="text-end">
                Saldo di jurnal
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableLoading colSpan={5} />
            ) : isEmpty(data) || !data ? (
              <TableNotFound colSpan={5} />
            ) : (
              data.map((item, index) => {
                return (
                  <TableItem
                    key={`table-account-${index}`}
                    item={item}
                    checked={isSelected(item.id)}
                    onToggle={() => toggleOne(item.id)}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  );
}
