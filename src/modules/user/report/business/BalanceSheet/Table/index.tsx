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
import TableFilter from "./TableFilter";
import { todayYMDString } from "@helpers/date";
import useGetReportBalanceSheet from "@services/user/report/balance-sheet/hooks/useGetReportBalanceSheet";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

export default function RBBalanceSheet() {
  const { data, loading } = useGetReportBalanceSheet();

  const getAccountUrl = (id: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cashbank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <TableFilter />
        <TableWrapper>
          <Table>
            <TableHeader className="px-5 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-white/[0.05]">
              <TableRow>
                <TableCell colSpan={2} isHeader className="text-start">
                  Nama Akun
                </TableCell>
                <TableCell isHeader>{todayYMDString}</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableLoading colSpan={3} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={3} />
              ) : (
                data
                  .filter((item) => item.is_posting)
                  .map((item, index) => (
                    <TableRow key={`table-item-${index}`}>
                      <TableCell className="text-start">
                        <Link
                          className={`flex my-auto text-brand-600 dark:text-white`}
                          to={getAccountUrl(item.id, item.category?.id)}
                        >
                          {item.code}
                        </Link>
                      </TableCell>

                      <TableCell className="text-start">
                        <Link
                          className={`flex my-auto text-brand-600 dark:text-white`}
                          to={getAccountUrl(item.id, item.category?.id)}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </div>
  );
}
