import { useForm, type SubmitHandler } from "react-hook-form";
import { isEmpty } from "lodash";
import { BeatLoader } from "react-spinners";
import { MdOutlineRefresh } from "react-icons/md";

import TableItem from "./TableItem";

import useUserStore from "@store/useUserStore";
import { todayYMDString, formatIDRLocale } from "@helpers/index";

import DatePicker from "@components/form/date-picker";
import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";

import useGetAllLedgerAccount from "@services/user/report/ledger/hooks/useGetAllLedgerAccount";

export default function RBLedger() {
  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);

  const setStartDate = useUserStore((state) => state.setLedgerStartDate);
  const setEndDate = useUserStore((state) => state.setLedgerEndDate);

  const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { data, loading } = useGetAllLedgerAccount();

  const onSubmit: SubmitHandler<any> = async (state) => {
    setStartDate(state.start_date);
    setEndDate(state.end_date);
  };

  const onClear = () => {
    methods.reset({
      start_date: todayYMDString,
      end_date: todayYMDString,
    });

    resetLedgerFilter();
  };

  return (
    <>
      {/* TABLE HEADER */}
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 items-end">
          <DatePicker
            label="Tgl. mulai"
            placeholder="Pilih tanggal"
            id="start_date"
            name="start_date"
            defaultValue={startDate}
          />

          <DatePicker
            label="Tgl. selesai"
            placeholder="Pilih tanggal"
            id="end_date"
            name="end_date"
            defaultValue={endDate}
          />

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onClear}
              disabled={!isValid}
            >
              <MdOutlineRefresh className="text-xl scale-x-[-1]" />
            </Button>

            <Button
              size="sm"
              className="lg:w-fit w-full"
              disabled={!isValid || isSubmitting}
            >
              Filter
            </Button>
          </div>
        </div>
      </Form>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nomor
                </th>
                {/* <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kontak
                </th> */}
                <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Debit
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Kredit
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Saldo
                </th>
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
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item, index) => {
                    return (
                      <TableItem key={`table-account-${index}`} item={item} />
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
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
