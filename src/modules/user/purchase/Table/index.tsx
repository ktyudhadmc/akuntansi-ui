import { BeatLoader } from "react-spinners";
import TableHeader from "./Header";

export default function PurchaseTable() {
  return (
    <>
      <TableHeader setSearchCallback={(e) => console.log(e)} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Akun
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Supplier
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Debit
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kredit
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <div className="sweet-loading">
                    <BeatLoader color="var(--color-brand-600)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
