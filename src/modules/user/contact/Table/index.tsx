// import { BeatLoader } from "react-spinners";
import TableHeader from "./TableHeader";
import type { Contact } from "@services/user/contact/interfaces/response.type";
import TableItem from "./TableItem";

export default function ContactTable() {
  // const navItems: NavItem[] = [
  const dataContact: Contact[] = [
    {
      id: 1,
      name: "PT DINAMIKA MEGATAMA CITRA",
      code: "DMC-001",
      email: "dmc@dinamikajurnal.com",
      phone: "081234567890",
      is_customer: true,
      is_supplier: true,
    },
    {
      id: 2,
      name: "PT DINAMIKA MEGATAMA CITRA 2",
      code: "DMC-002",
      email: "dmc@dinamikajurnal.com",
      phone: "081234567890",
      is_customer: false,
      is_supplier: true,
    },
  ];

  return (
    <>
      <TableHeader setSearchCallback={(e) => console.log(e)} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Email
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Phone
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {/* {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : ( */}
              {dataContact.map((item, index) => {
                return <TableItem key={`table-contact-${index}`} item={item} />;
              })}
              {/* )} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
