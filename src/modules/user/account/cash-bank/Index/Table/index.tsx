import TableItem from "./TableItem";
import TableHeader from "./Header";

import { isEmpty } from "lodash";
import { BeatLoader } from "react-spinners";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import useGetAllCashBank from "@services/user/account/cash-bank/hooks/useGetAllCashBank";

export default function AccountTable() {
  const { data, loading, setName } = useGetAllCashBank();

  return (
    <>
      <TableHeader setSearchCallback={(e) => setName(e)} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode akun
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama akun
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Saldo bank
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Saldo di jurnal
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 dark:text-gray-400 py-4"
                  >
                    <HiOutlineArchiveBox className=" mx-auto text-2xl" />
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td
                      colSpan={5}
                      className="text-start px-5 py-3 font-semibold text-theme-xs"
                    >
                      Kas & Bank
                    </td>
                  </tr>
                  {data.map((item, index) => {
                    return (
                      <TableItem key={`table-account-${index}`} item={item} />
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
