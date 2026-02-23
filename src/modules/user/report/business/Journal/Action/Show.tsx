import { isEmpty } from "lodash";
import { HiChevronLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";

import { formatIDRLocale } from "@helpers/currency";

import {
  Table,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import useGetJournal from "@services/user/report/journal/hooks/useGetJournal";
import useGoBack from "@hooks/useGoBack";

export default function RBJournalShow() {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const params = useParams();

  const { data, loading } = useGetJournal(params.id as string);

  const getAccountUrl = (id: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cashbank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-col gap-2.5 divide-gray-300 sm:flex-row sm:divide-x dark:divide-gray-700">
          <div className="flex lg:flex-row flex-col lg:items-center gap-2 sm:pr-3">
            <div className="flex gap-2">
              <span className="text-base font-medium text-gray-700 dark:text-gray-400">
                No. Transaksi :
              </span>

              <Skeleton isLoading={loading} height="20px" width="100px">
                <span className="text-base font-medium text-gray-700 dark:text-white">
                  {data?.document_number}
                </span>
              </Skeleton>
            </div>
          </div>

          <div className="flex gap-2 justify-start justify-between">
            <p className="text-sm text-gray-500 sm:pl-3 dark:text-gray-400 my-auto">
              Tgl. Transaksi:&nbsp;
            </p>

            <Skeleton isLoading={loading} height="20px" width="100px">
              <span className="text-sm text-gray-500 dark:text-gray-400 my-auto">
                {data?.date}
              </span>
            </Skeleton>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={goBack}
            size="sm"
            variant="outline"
            className="group items-center !gap-0 overflow-hidden"
          >
            <HiChevronLeft className="shrink-0 mx-auto" size={20} />

            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[100px]">
              Kembali
            </span>
          </Button>
          <Button
            onClick={() => navigate(`/user/journals/${data?.id}/edit`)}
            size="sm"
            variant="outline"
            className="lg:w-fit w-full"
            disabled={!data}
          >
            Ubah
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
          Rincian
        </h2>

        <TableWrapper>
          <Table className="text-left text-sm text-gray-700 dark:border-gray-800">
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
              <TableRow className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                <TableCell isHeader>No. Akun</TableCell>
                <TableCell isHeader>Akun</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
                >
                  Deskripsi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 text-sm font-medium text-end whitespace-nowrap text-gray-700 dark:text-gray-400"
                >
                  Debit
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 text-sm font-medium text-end whitespace-nowrap text-gray-700 dark:text-gray-400"
                >
                  Kredit
                </TableCell>
              </TableRow>
            </TableHeader>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
              {loading ? (
                <TableLoading colSpan={5} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={5} />
              ) : (
                <>
                  {/* ACCOUNT */}
                  <TableRow>
                    <TableCell>
                      <Link
                        className={`flex my-auto text-brand-600`}
                        to={getAccountUrl(
                          data.account.id,
                          data.account?.category?.id,
                        )}
                      >
                        {data.account.code}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className={`flex my-auto text-brand-600`}
                        to={getAccountUrl(
                          data.account.id,
                          data.account?.category?.id,
                        )}
                      >
                        {data.account.name}
                      </Link>
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell className="text-end font-semibold">
                      {formatIDRLocale(data.amount)}
                    </TableCell>
                    <TableCell className="text-end font-semibold">
                      {formatIDRLocale(0)}
                    </TableCell>
                  </TableRow>

                  {/* ACCOUNT */}
                  <TableRow>
                    <TableCell>
                      <Link
                        className={`flex my-auto text-brand-600`}
                        to={getAccountUrl(
                          data.counter_account.id,
                          data.counter_account?.category?.id,
                        )}
                      >
                        {data.counter_account.code}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className={`flex my-auto text-brand-600`}
                        to={getAccountUrl(
                          data.counter_account.id,
                          data.counter_account?.category?.id,
                        )}
                      >
                        {data.counter_account.name}
                      </Link>
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell className="text-end font-semibold">
                      {formatIDRLocale(0)}
                    </TableCell>
                    <TableCell className="text-end font-semibold">
                      {formatIDRLocale(data.amount)}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </tbody>
          </Table>
        </TableWrapper>

        <div className="mt-6 w-full text-right sm:w-xs ml-auto">
          <ul className="flex flex-row lg:gap-12 lg:justify-end justify-between">
            <li className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-white whitespace-nowrap">
                Total Debit
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                {formatIDRLocale(data?.amount ?? 0, { withSymbol: true })}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-white whitespace-nowrap">
                Total Kredit
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                {formatIDRLocale(data?.amount ?? 0, { withSymbol: true })}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
