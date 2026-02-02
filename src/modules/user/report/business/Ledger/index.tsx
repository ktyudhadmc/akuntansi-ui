import { useForm, type SubmitHandler } from "react-hook-form";
import { isEmpty } from "lodash";
import { BeatLoader } from "react-spinners";
import { MdOutlineRefresh } from "react-icons/md";

import TableItem from "./TableItem";

import useMapInputOptions from "@hooks/useMapInputOptions";
import useUserStore from "@store/useUserStore";

import DatePicker from "@components/form/date-picker";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import SelectTwoRhf from "@components/form/SelectTwoRhf";
import Form from "@components/form/Form";

import useGetAll from "@services/user/account/index/hooks/useGetAll";
import useGetLedgerByAccount from "@services/user/report/ledger/hooks/useGetLedgerByAccount";

export default function RBLedger() {
  const { data: accounts, loading: accountLoading } = useGetAll();
  const accountOptions = useMapInputOptions(accounts);

  const account = useUserStore((state) => state.ledgerAccount);
  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);

  const setAccount = useUserStore((state) => state.setLedgerAccount);
  const setStartDate = useUserStore((state) => state.setLedgerStartDate);
  const setEndDate = useUserStore((state) => state.setLedgerEndDate);

  const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const methods = useForm<any>({ mode: "onChange" });

  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { data, loading } = useGetLedgerByAccount(
    account ? (account as string) : undefined,
  );

  const onSubmit: SubmitHandler<any> = async (state) => {
    setAccount(state.account);
    setStartDate(state.start_date);
    setEndDate(state.end_date);
  };

  const onClear = () => {
    methods.reset({
      account: null,
      start_date: null,
      end_date: null,
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
            defaultDate={startDate}
            required
          />

          <DatePicker
            label="Tgl. selesai"
            placeholder="Pilih tanggal"
            id="end_date"
            name="end_date"
            defaultDate={endDate}
            required
          />

          <div>
            <Skeleton isLoading={accountLoading}>
              <SelectTwoRhf
                label="Akun"
                name="account"
                placeholder="--- Pilih Akun ---"
                selectTwoOptions={accountOptions}
                defaultValue={account}
                isClearable
                isSearchable
                isRequired
              />
            </Skeleton>
          </div>
          <div className="flex gap-2">
            {isValid && (
              <Button size="sm" variant="outline" onClick={onClear}>
                <MdOutlineRefresh className="text-xl scale-x-[-1]" />
              </Button>
            )}

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
              {/* {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              )} */}
              {loading ? (
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
                data?.mutations.map((item, index) => {
                  return (
                    <TableItem key={`table-account-${index}`} item={item} />
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
