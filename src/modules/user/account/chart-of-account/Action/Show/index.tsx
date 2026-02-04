import { HiPencil } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";

import useUserStore from "@store/useUserStore";
import { todayYMDString } from "@helpers/index";

import TableItem from "./TableItem";
import DatePicker from "@components/form/date-picker";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";

import useGetAccount from "@services/user/account/index/hooks/useGet";
import useGetLedgerByAccount from "@services/user/report/ledger/hooks/useGetLedgerByAccount";
import Form from "@components/form/Form";

export default function ChartOfAccountShow() {
  const params = useParams();
  const navigate = useNavigate();

  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);
  const setStartDate = useUserStore((state) => state.setLedgerStartDate);
  const setEndDate = useUserStore((state) => state.setLedgerEndDate);
  const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const { data: account, loading: accountLoading } = useGetAccount(
    params.id as string,
  );
  const { data: ledgers, loading: ledgerLoading } = useGetLedgerByAccount(
    params.id as string,
  );

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

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
      {/* <TableHeader
        setStartDate={(e) => console.log(e)}
        setEndDate={(e) => console.log(e)}
      /> */}
      {/* TABLE HEADER */}
      <div className="flex lg:flex-row flex-col justify-between gap-4 items-end">
        <div className="mt-auto md:min-w-xs min-w-full flex lg:flex-col flex-row gap-2 lg:justify-start justify-between">
          <div className=" w-full">
            <Skeleton isLoading={accountLoading} height="1.2rem" width="50%">
              <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                {account?.code}
              </span>
            </Skeleton>
            <Skeleton isLoading={accountLoading} height="1.7rem">
              <h5 className="dark:text-white font-semibold text-lg">
                {account?.name}
              </h5>
            </Skeleton>
          </div>

          <Button
            onClick={() => navigate(`edit`)}
            size="xs"
            variant="outline"
            className="w-fit h-fit my-auto"
            disabled={accountLoading}
          >
            <HiPencil />
            <span className="lg:inline-block hidden"> Ubah</span>
          </Button>
        </div>

        <Form
          {...methods}
          onSubmit={onSubmit}
          className="lg:flex-row lg:items-end lg:justify-end"
        >
          <DatePicker
            label="Tgl. mulai"
            placeholder="Pilih tanggal"
            id="start_date"
            name="start_date"
            defaultValue={startDate}
            required
          />

          <DatePicker
            label="Tgl. selesai"
            placeholder="Pilih tanggal"
            id="end_date"
            name="end_date"
            defaultValue={endDate}
            required
          />

          <div className="flex gap-2 justify-end">
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
        </Form>
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
              {ledgerLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(ledgers?.mutations) || !ledgers?.mutations ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                ledgers.mutations.map((item, index) => {
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
