import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import useGetAll from "@services/user/supplier/hooks/useGetAll";
import TableHeader from "./TableHeader";

export default function SupplierTable() {
  // const navItems: NavItem[] = [
  // const dataContact: Contact[] = [
  //   {
  //     id: 1,
  //     name: "PT DINAMIKA MEGATAMA CITRA",
  //     code: "DMC-001",
  //     email: "dmc@dinamikajurnal.com",
  //     phone: "081234567890",
  //     is_customer: true,
  //     is_supplier: true,
  //   },
  //   {
  //     id: 2,
  //     name: "PT DINAMIKA MEGATAMA CITRA 2",
  //     code: "DMC-002",
  //     email: "dmc@dinamikajurnal.com",
  //     phone: "081234567890",
  //     is_customer: false,
  //     is_supplier: true,
  //   },
  // ];

  const { data, loading, setName } = useGetAll();

  return (
    <>
      <TableHeader setSearchCallback={setName} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode Supplier
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data?.slice(0, 50).map((item, index) => {
                  return (
                    <TableItem key={`table-contact-${index}`} item={item} />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
