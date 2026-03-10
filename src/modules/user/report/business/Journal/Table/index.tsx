import useGetAll from "@services/user/report/journal/hooks/useGetAll";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableFilter from "./TableFilter";
import { formatIDRLocale } from "@helpers/index";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";

export default function GeneralJournal() {
  const { data, loading, setSearch } = useGetAll();

  return (
    <>
      <TableFilter setSearch={setSearch} />
      <TableWrapper isSticky>
        <Table>
          {/* Table Header */}
          <TableHeader isSticky>
            <TableRow className="pointer-events-none">
              <TableCell className="text-start" isHeader>
                Akun
              </TableCell>
              <TableCell className="text-end" isHeader>
                Debit
              </TableCell>
              <TableCell className="text-end" isHeader>
                Kredit
              </TableCell>
              <th></th>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableLoading colSpan={3} />
            ) : isEmpty(data?.list) ? (
              <TableNotFound colSpan={3} />
            ) : (
              <>
                {data?.list.map((item, index) => {
                  return (
                    <TableItem key={`table-account-${index}`} item={item} />
                  );
                })}
              </>
            )}
          </TableBody>
          <TableFoot isSticky>
            <TableRow  className="pointer-events-none">
              <TableCell isHeader className="text-end">
                Total Keseluruhan
              </TableCell>
              <TableCell isHeader className="text-end">
                {formatIDRLocale(data?.summary.total_debit ?? 0)}
              </TableCell>
              <TableCell isHeader className="text-end">
                {formatIDRLocale(data?.summary.total_credit ?? 0)}
              </TableCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableWrapper>
    </>
  );
}
