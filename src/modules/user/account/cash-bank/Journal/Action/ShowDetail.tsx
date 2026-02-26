import { Modal } from "@components/ui/modal";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import type { BankStatement } from "@services/user/account/cash-bank/interfaces/response-bank-statement.type";
import { Link } from "react-router-dom";

interface Props {
  item: BankStatement;
  onOpen: boolean;
  onClose: () => void;
}

export default function CBJournalShowDetail({ item, onOpen, onClose }: Props) {
  const getAccountUrl = (id?: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cash-bank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  return (
    <Modal
      isOpen={onOpen}
      onClose={onClose}
      className="lg:max-w-fit max-w-sm m-4"
    >
      <div className="relative max-w-fit rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
        <div className="relative items-center justify-start z-1 lg:mb-4 mb-3">
          <small className="text-gray-500 dark:text-gray-400 text-theme-xs">
            Laporan Jurnal
          </small>
          <br />
          <p className="text-sm text-black dark:text-white font-semibold">
            {item.document_number}
          </p>
        </div>
        <TableWrapper>
          <Table className="text-left text-sm text-gray-700 dark:border-gray-800">
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
              <TableRow className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                <TableCell isHeader>No. Akun</TableCell>
                <TableCell isHeader>Akun</TableCell>
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
              {/* ACCOUNT */}
              <TableRow>
                <TableCell>
                  <Link
                    className={`flex my-auto text-brand-600 dark:text-white`}
                    to={getAccountUrl(
                      item.bank_account.id,
                      item.bank_account?.category?.id,
                    )}
                  >
                    {item.bank_account.code}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Link
                    className={`flex my-auto text-brand-600 dark:text-white`}
                    to={getAccountUrl(
                      item.bank_account.id,
                      item.bank_account?.category?.id,
                    )}
                  >
                    {item.bank_account.name}
                  </Link>
                </TableCell>
                <TableCell className="text-end font-semibold">
                  {formatIDRLocale(item.amount)}
                </TableCell>
                <TableCell className="text-end font-semibold">
                  {formatIDRLocale(0)}
                </TableCell>
              </TableRow>

              {/* ACCOUNT */}
              <TableRow>
                <TableCell>
                  <Link
                    className={`flex my-auto text-brand-600 dark:text-white`}
                    to={getAccountUrl(
                      item.counter_account.id,
                      item.counter_account?.category?.id,
                    )}
                  >
                    {item.counter_account.code}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Link
                    className={`flex my-auto text-brand-600 dark:text-white`}
                    to={getAccountUrl(
                      item.counter_account.id,
                      item.counter_account?.category?.id,
                    )}
                  >
                    {item.counter_account.name}
                  </Link>
                </TableCell>

                <TableCell className="text-end font-semibold">
                  {formatIDRLocale(0)}
                </TableCell>
                <TableCell className="text-end font-semibold">
                  {formatIDRLocale(item.amount)}
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableWrapper>

        <div className="mt-2 w-full text-right sm:w-xs ml-auto">
          <ul className="flex flex-row lg:gap-12 lg:justify-end justify-between">
            <li className="flex flex-col">
              <span className="text-theme-xs text-gray-500 dark:text-white whitespace-nowrap">
                Total Debit
              </span>
              <span className="text-theme-xs font-medium text-gray-700 dark:text-white">
                {formatIDRLocale(item?.amount ?? 0, { withSymbol: true })}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-theme-xs text-gray-500 dark:text-white whitespace-nowrap">
                Total Kredit
              </span>
              <span className="text-theme-xs font-medium text-gray-700 dark:text-white">
                {formatIDRLocale(item?.amount ?? 0, { withSymbol: true })}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
