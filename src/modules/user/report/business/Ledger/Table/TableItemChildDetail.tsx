import { formatIDRLocale } from "@helpers/currency";
import { formatDateAsYMD } from "@helpers/date";
// import useGetLedgerByAccount from "@services/user/report/ledger/hooks/useGetLedgerByAccount";
import type { LedgerItemTransaction } from "@services/user/report/ledger/interfaces/response.type";
// import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
// import { BeatLoader } from "react-spinners";

interface Props {
  accountId?: number;
  item: LedgerItemTransaction;
  onOpen: boolean;
}
export default function TableItemChildDetail({
  // accountId,
  item,
  onOpen,
}: Props) {
  if (!onOpen) return;

  // const { data, loading } = useGetLedgerByAccount(accountId.toString());

  const getTransactionUrl = (id: string, type: string) => {
    switch (type) {
      case "sales":
        return `/user/sales/${id}`;
      case "purchase":
        return `/user/purchases/${id}`;
      case "journal":
        return `/user/journals/${id}/edit`;
      default:
        return "#";
    }
  };

  return (
    <>
      {/* {loading ? (
        <tr>
          <td colSpan={5} className="text-center py-16">
            <div className="sweet-loading">
              <BeatLoader color="var(--color-brand-600)" />
            </div>
          </td>
        </tr>
      ) : isEmpty(data?.mutations) || !data ? (
        <tr>
          <td colSpan={5} className="text-center py-4">
            Data tidak tersedia
          </td>
        </tr>
      ) : (
        <>
          {data?.mutations.map((item, index) => {
            return (
              <tr key={`table-item-detail-${index}`}>
                <td className="pl-15 pr-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {item.date}
                </td>
                <td className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 ">
                  <Link
                    to={getTransactionUrl(
                      item.transaction.id,
                      item.transaction.type,
                    )}
                    className="cursor-pointer text-brand-500 dark:text-gray-400"
                  >
                    ({item.transaction.document_number ?? "-"})
                  </Link>
                  <br />
                  <small className="italic">{item.description}</small>
                </td>
                <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                  {formatIDRLocale(item.debit)}
                </td>
                <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                  {formatIDRLocale(item.credit)}
                </td>
                <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                  {formatIDRLocale(item.balance)}
                </td>
              </tr>
            );
          })}

          <tr>
            <td
              colSpan={2}
              className="px-5 py-1 text-black text-end text-theme-xs dark:text-white font-semibold"
            >
              Total Keseluruhan
            </td>
            <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
              {formatIDRLocale(0)}
            </td>
            <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
              {formatIDRLocale(0)}
            </td>
          </tr>
        </>
      )} */}

      <tr>
        <td className="pl-15 pr-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
          {formatDateAsYMD(item.date)}
        </td>
        <td className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 whitespace-nowrap">
          <Link
            to={getTransactionUrl(item.id, item.type)}
            className="cursor-pointer text-brand-500 dark:text-gray-400 hover:underline"
          >
            ({item.document_number ?? "-"})
          </Link>
          <br />
          <small className="italic">{item.description}</small>
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.debit ?? 0)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.credit ?? 0)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.balance ?? 0)}
        </td>
      </tr>
    </>
  );
}
