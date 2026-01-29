import useGetAccount from "@services/user/account/hooks/useGet";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import DatePicker from "@components/form/default/DatePicker";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import { HiPencil } from "react-icons/hi";

export default function ChartOfAccountShow() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, loading } = useGetAccount(params.id as string);

  return (
    <>
      {/* <TableHeader
        setStartDate={(e) => console.log(e)}
        setEndDate={(e) => console.log(e)}
      /> */}
      {/* TABLE HEADER */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="mt-auto md:min-w-xs min-w-full flex lg:flex-col flex-row gap-2 lg:justify-start justify-between">
          <div className=" w-full">
            <Skeleton isLoading={loading} height="1.2rem" width="50%">
              <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                {data?.code}
              </span>
            </Skeleton>
            <Skeleton isLoading={loading} height="1.7rem">
              <h5 className="dark:text-white font-semibold text-lg">
                {data?.name}
              </h5>
            </Skeleton>
          </div>

          <Button
            onClick={() => navigate(`edit`)}
            size="xs"
            variant="outline"
            className="w-fit h-fit my-auto"
            disabled={loading}
          >
            <HiPencil />
            <span className="lg:inline-block hidden"> Ubah</span>
          </Button>
        </div>

        <div className="flex lg:flex-row flex-col gap-4 mt-auto">
          <DatePicker
            label="Tgl. mulai"
            id="start_date"
            name="start_date"
            defaultDate={new Date()}
            onChange={(e) => console.log(e)}
          />

          <DatePicker
            label="Tgl. selesai"
            id="end_date"
            name="end_date"
            defaultDate={new Date()}
            onChange={(e) => console.log(e)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nomor
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kontak
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Debit
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kredit
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Saldo
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              )}
              {/* {loading || isLoading ? (
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
              ) : (
                data.map((item, index) => {
                  return (
                    <TableItem key={`table-account-${index}`} item={item} />
                  );
                })
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
