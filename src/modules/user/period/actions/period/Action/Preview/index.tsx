import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
} from "@components/ui/table";

import Button from "@components/ui/button/Button";
import useGetAllPeriodLockPreview from "@services/user/period/hooks/useGetAllPeriodLockPreview";
import TableInformation from "./TableInformation";

export default function PeriodLockPreview() {
  const params = useParams();
  const { data, loading } = useGetAllPeriodLockPreview(params.id as string);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableInformation />
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="px-6 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-white/[0.05]">
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      rowSpan={2}
                      isHeader
                      className="border-r align-middle dark:border-white/[0.10]"
                    >
                      Daftar Akun
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Neraca Saldo
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Laba Rugi
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Neraca
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableLoading colSpan={8} />
                  ) : isEmpty(data) || !data ? (
                    <TableNotFound colSpan={8} />
                  ) : (
                    data?.map((item, index) => {
                      return (
                        <TableItem
                          key={`table-item-period-lock-${index}`}
                          item={item}
                        />
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex">
            <Button
              type="button"
              size="sm"
              className="md:ml-auto w-full md:w-fit"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
