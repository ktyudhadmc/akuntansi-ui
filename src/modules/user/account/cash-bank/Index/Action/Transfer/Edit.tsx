import DatePicker from "@components/form/date-picker";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import TextArea from "@components/form/input/TextArea";
import Select from "@components/form/Select";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import { formatDateAsYMD } from "@helpers/date";
import useGoBack from "@hooks/useGoBack";
import useMapInputOptions from "@hooks/useMapInputOptions";

import useGetAllCashBank from "@services/user/account/cash-bank/hooks/useGetAllCashBank";
import useGetTransaction from "@services/user/account/cash-bank/hooks/useGetTransaction";
import useUpdateTransaction from "@services/user/account/cash-bank/hooks/useUpdateTransaction";
import type { ICreateTransactionPayload } from "@services/user/account/cash-bank/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FormFields = ICreateTransactionPayload;

export default function EditTransfer() {
  const goBack = useGoBack();
  const params = useParams();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { data, loading } = useGetTransaction(params.id as string);
  const { data: cashBank, loading: cashBankLoading } = useGetAllCashBank();
  const cashBankOptions = useMapInputOptions(cashBank);
  const selectedAccountSrcId = methods.watch("account_id");
  const selectedAccountDstId = methods.watch("counter_account_id");

  const { updateData } = useUpdateTransaction(params.id as string);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateData({ ...state, type: "credit" });
    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan data!");
      } else {
        methods.reset();
        toast.success("Berhasil menyimpan data!");
        goBack();
      }
    }
  };

  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <Skeleton isLoading={cashBankLoading || loading}>
            <Select
              label="Transfer dari"
              name="account_id"
              placeholder="--- Pilih ---"
              options={cashBankOptions.filter(
                (item) => item.value != selectedAccountDstId,
              )}
              defaultValue={data?.bank_account.id}
              required
            />
          </Skeleton>

          <Skeleton isLoading={cashBankLoading || loading}>
            <Select
              label="Setor ke"
              name="counter_account_id"
              placeholder="--- Pilih ---"
              options={cashBankOptions.filter(
                (item) => item.value != selectedAccountSrcId,
              )}
              defaultValue={data?.counter_account.id}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Input
              label="Jumlah"
              placeholder="0,00"
              name="amount"
              type="number"
              leftIcon={"Rp"}
              defaultValue={data?.amount}
              required
            />
          </Skeleton>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. Transaksi"
              name="date"
              required
              defaultValue={formatDateAsYMD(data?.date as Date)}
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="No. Transaksi"
              name="reference"
              placeholder="[Auto]"
              defaultValue={data?.reference ?? ""}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <TextArea
              label="Memo"
              name="description"
              placeholder="Memo"
              defaultValue={data?.description}
            />
          </Skeleton>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            onClick={goBack}
            className="uppercase"
            size="sm"
            variant="outline"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className=" uppercase"
            size="sm"
            disabled={!isValid || isSubmitting}
          >
            {!isSubmitting ? "Kirim" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
