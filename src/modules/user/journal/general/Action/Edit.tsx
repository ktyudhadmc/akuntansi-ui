import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useMapInputOptions from "@hooks/useMapInputOptions";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import TextArea from "@components/form/input/TextArea";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import DatePicker from "@components/form/date-picker";
import Skeleton from "@components/Skeleton/Skeleton";
import SelectTwo from "@components/form/SelectTwo";

import useGetAllAccount from "@services/user/account/hooks/useGetAll";
import useUpdate from "@services/user/journal/general/hooks/useUpdate";
import type { ICreateGeneralJournalPayload } from "@services/user/journal/general/interfaces/request.type";
import useGetGeneralJournal from "@services/user/journal/general/hooks/useGet";

type FormFields = ICreateGeneralJournalPayload;

export default function GeneralJournalEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const debitAccountId = methods.watch("account_id");
  const creditAccountId = methods.watch("counter_account_id");

  const isValid =
    methods.formState.isValid && creditAccountId && debitAccountId;

  const { updateData } = useUpdate(params.id as string);
  const { data, loading } = useGetGeneralJournal(params.id as string);

  const { data: accounts, loading: accountLoading } = useGetAllAccount();

  /** account only posting */
  const accountsFiltered = accounts?.filter((item) => item.is_posting == true);
  const accountOptions = useMapInputOptions(accountsFiltered);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateData(state);
    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan data!");
      } else {
        methods.reset();
        navigate(-1);
        toast.success("Berhasil menyimpan data!");
      }
    }
  };
  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. transaksi"
              id="date"
              name="date"
              defaultDate={data?.date}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Input
              label="Nominal (IDR)"
              type="text"
              placeholder="Nominal transaksi"
              name="amount"
              defaultValue={data?.amount}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="Nomor transaksi"
              placeholder="Nomor transaksi"
              name="document_number"
              defaultValue={data?.document_number}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Input
              label="Nomor referensi"
              placeholder="Nomor referensi"
              defaultValue={data?.reff}
              name="reff"
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <TextArea
              label="Deskripsi"
              name="description"
              placeholder="Deskripsi"
              defaultValue={data?.description}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <TextArea
              label="Catatan"
              name="remarks"
              placeholder="Catatan tambahan"
              defaultValue={data?.remarks}
              required
            />
          </Skeleton>

          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwo
              label="Akun debit"
              name="account_id"
              placeholder="--- Pilih Akun Debit ---"
              selectTwoOptions={accountOptions}
              defaultValue={{
                label: data?.account.name,
                value: data?.account.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>

          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwo
              label="Akun kredit"
              name="counter_account_id"
              placeholder="--- Pilih Akun Kredit ---"
              selectTwoOptions={accountOptions}
              defaultValue={{
                label: data?.counter_account.name,
                value: data?.counter_account.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            onClick={() => navigate(-1)}
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
