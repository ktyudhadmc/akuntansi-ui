import { isEmpty } from "lodash";
import { HiOutlinePrinter } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { formatIDRLocale } from "@helpers/currency";

import Skeleton from "@components/Skeleton/Skeleton";
import Badge from "@components/ui/badge/Badge";
import Button from "@components/ui/button/Button";

import useGetPurchase from "@services/user/purchase/hooks/useGet";

export default function PurchaseShow() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, loading } = useGetPurchase(params.id as string);

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

            <Badge color="success">Completed</Badge>
          </div>

          <div className="flex gap-2">
            <p className="text-sm text-gray-500 sm:pl-3 dark:text-gray-400 my-auto">
              Due date:&nbsp;
            </p>

            <Skeleton isLoading={loading} height="20px" width="100px">
              <span className="text-sm text-gray-500 dark:text-gray-400 my-auto">
                {data?.due_date}
              </span>
            </Skeleton>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("edit")}
            size="sm"
            variant="outline"
            className="lg:w-fit w-full"
          >
            Ubah
          </Button>
          <Button size="sm" className="lg:w-fit w-full">
            <HiOutlinePrinter />
            Cetak
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 2xl:col-span-9">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
            <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Detail Pembelian
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="custom-scrollbar overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                      <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Produk
                      </th>
                      <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                        Kuantitas
                      </th>
                      <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Satuan
                      </th>
                      <th className="px-5 py-4 text-sm font-medium text-end whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Harga Satuan
                      </th>
                      <th className="px-5 py-4 text-sm font-medium text-end whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16">
                          <div className="sweet-loading">
                            <BeatLoader color="var(--color-brand-600)" />
                          </div>
                        </td>
                      </tr>
                    ) : isEmpty(data) || !data.items ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          Data tidak tersedia
                        </td>
                      </tr>
                    ) : (
                      data?.items.map((item, index) => {
                        return (
                          <tr key={`table-item-purchase-detail-${index}`}>
                            <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {item.material.name}
                            </td>
                            <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                              {item.qty}
                            </td>
                            <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {item.unit.name}
                            </td>
                            <td className="px-5 py-4 text-sm whitespace-nowrap text-end text-gray-500 dark:text-gray-400">
                              {formatIDRLocale(item.price, {
                                withSymbol: true,
                              })}
                            </td>
                            <td className="px-5 py-4 text-sm whitespace-nowrap text-end text-gray-500 dark:text-gray-400">
                              {formatIDRLocale(item.qty * item.price, {
                                withSymbol: true,
                              })}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-wrap justify-between sm:justify-end">
              <div className="mt-6 w-full space-y-1 text-right sm:w-xs">
                <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
                  Pembelian
                </p>
                <ul className="space-y-2">
                  {/* <li className="flex justify-between gap-5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Sub Total
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      $3,850
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Vat (10%):
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      $385
                    </span>
                  </li> */}
                  <li className="flex items-center justify-between gap-4">
                    <span className="font-medium text-gray-700 dark:text-white">
                      Total
                    </span>
                    <Skeleton isLoading={loading} height="2rem">
                      <span className="text-md font-semibold text-gray-800 dark:text-white/90">
                        {formatIDRLocale(data?.total_amount ?? 0, {
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

        <div className="space-y-6 lg:col-span-4 2xl:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
            <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Informasi
            </h2>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              <li className="flex items-start gap-5 py-2.5">
                <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
                  Supplier
                </span>
                <Skeleton isLoading={loading} height="2rem">
                  <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
                    {data?.supplier.name}
                  </span>
                </Skeleton>
              </li>
              <li className="flex items-start gap-5 py-2.5">
                <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
                  Tgl. Transaksi
                </span>
                <Skeleton isLoading={loading} height="2rem">
                  <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
                    {data?.date}
                  </span>
                </Skeleton>
              </li>
              <li className="flex items-start gap-5 py-2.5">
                <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
                  Tgl. Tempo
                </span>
                <Skeleton isLoading={loading} height="2rem">
                  <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
                    {data?.due_date}
                  </span>
                </Skeleton>
              </li>
              {/* <li className="flex items-start gap-5 py-2.5">
                <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
                  Akun
                </span>
                <Skeleton isLoading={loading} height="2rem">
                  <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
                    {data?.account.code} - {data?.account.name}
                  </span>
                </Skeleton>
              </li> */}

              <li className="flex items-start gap-5 py-2.5">
                <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
                  Catatan
                </span>
                <Skeleton isLoading={loading} height="2rem">
                  <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
                    {data?.description}
                  </span>
                </Skeleton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
