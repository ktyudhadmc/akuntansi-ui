import { isEmpty } from "lodash";
import { HiChevronLeft, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";

import { formatIDRLocale } from "@helpers/currency";
import { useModal } from "@hooks/useModal";
import useGoBack from "@hooks/useGoBack";

import CBJournalShowDetail from "./ShowDetail";
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
import Badge from "@components/ui/badge/Badge";

import { formatDateAsYMD } from "@helpers/date";
import useGetTransaction from "@services/user/account/cash-bank/hooks/useGetTransaction";
import Delete from "./Delete";

export default function CBJournalShow() {
  const goBack = useGoBack();
  const params = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenTransaction,
    openModal: openModalTransaction,
    closeModal: closeModalTransaction,
  } = useModal();

  const { data, loading } = useGetTransaction(params.id as string);

  const getAccountUrl = (id?: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cash-bank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  return (
    <>
      {data && (
        <>
          <CBJournalShowDetail
            onOpen={isOpen}
            onClose={closeModal}
            item={data}
          />
          <Delete
            onOpen={isOpenTransaction}
            onClose={closeModalTransaction}
            id={data?.id}
            code={data?.document_number ?? "-"}
          />
        </>
      )}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center dark:border-gray-800 dark:bg-white/3">
          <div className="flex flex-col gap-2.5 divide-gray-300 sm:flex-row sm:divide-x dark:divide-gray-700">
            <div className="flex lg:flex-row flex-col lg:items-center gap-2 sm:pr-3">
              <div className="flex gap-2">
                <span className="text-sm text-gray-500 sm:pl-3 dark:text-gray-400 my-auto">
                  No. Transaksi :
                </span>

                <Skeleton isLoading={loading} height="20px" width="100px">
                  <span className="text-md font-medium text-gray-700 dark:text-white">
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
                  {data?.date ? formatDateAsYMD(data.date) : "-"}
                </span>
              </Skeleton>
            </div>
          </div>

          <Badge color="success">Terekonsiliasi</Badge>

          <div className="flex justify-end gap-2">
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
              onClick={() => navigate("edit")}
              size="sm"
              variant="outline"
              className="lg:w-fit w-full"
              disabled={!data}
            >
              <HiOutlinePencil />
            </Button>
            <Button
              onClick={openModalTransaction}
              size="sm"
              variant="outline"
              className="lg:w-fit w-full"
              disabled={!data}
            >
              <HiOutlineTrash />
            </Button>
            <Button
              onClick={openModal}
              size="sm"
              variant="outline"
              className="lg:w-fit w-full"
              disabled={!data}
            >
              Lihat Jurnal
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Rincian
          </h2>

          <div className="flex lg:justify-normal justify-between gap-4 mb-4">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
              Setor ke:{" "}
            </p>

            <Skeleton isLoading={loading} height="20px" width="100px">
              <Link
                className={`text-sm text-brand-600 dark:text-white my-auto`}
                to={getAccountUrl(
                  data?.counter_account.id,
                  data?.counter_account?.category?.id,
                )}
              >
                {data?.counter_account.name}
              </Link>
            </Skeleton>
          </div>

          <TableWrapper>
            <Table className="text-left text-sm text-gray-700 dark:border-gray-800">
              <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                  <TableCell isHeader>Kode Akun</TableCell>
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
                    Jumlah
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
                    <TableRow>
                      <TableCell>
                        <Link
                          className={`flex my-auto text-brand-600 dark:text-white`}
                          to={getAccountUrl(
                            data.bank_account.id,
                            data.bank_account?.category?.id,
                          )}
                        >
                          {data.bank_account.code}
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Link
                          className={`flex my-auto text-brand-600 dark:text-white`}
                          to={getAccountUrl(
                            data.bank_account.id,
                            data.bank_account?.category?.id,
                          )}
                        >
                          {data.bank_account.name}
                        </Link>
                      </TableCell>
                      <TableCell className="lg:max-w-md w-xs line-clamp-3">
                        {data.description}
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

          <div className="flex flex-wrap justify-between sm:justify-end">
            <div className="mt-6 w-full space-y-1 text-right sm:w-xs">
              <ul className="space-y-2">
                <li className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    Sub Total
                  </span>
                  <Skeleton isLoading={loading} height="1.5rem">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      {formatIDRLocale(data?.amount ?? 0, {
                        withSymbol: true,
                      })}
                    </span>
                  </Skeleton>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-700 dark:text-white">
                    Total
                  </span>
                  <Skeleton isLoading={loading} height="2rem">
                    <span className="text-md font-semibold text-gray-800 dark:text-white/90">
                      {formatIDRLocale(data?.amount ?? 0, {
                        withSymbol: true,
                      })}
                    </span>
                  </Skeleton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
