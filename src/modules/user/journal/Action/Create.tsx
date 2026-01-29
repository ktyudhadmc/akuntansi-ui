import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import TextArea from "@components/form/input/TextArea";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";

import type { ICreateGeneralJournalPayload } from "@services/user/journal/interfaces/request.type";
import DatePicker from "@components/form/date-picker";
import Skeleton from "@components/Skeleton/Skeleton";
import SelectTwo from "@components/form/SelectTwo";

import useCreate from "@services/user/journal/hooks/useCreate";
import useGetAllAccount from "@services/user/account/index/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import { toast } from "react-toastify";

type FormFields = ICreateGeneralJournalPayload;

export default function GeneralJournalCreate() {
  const navigate = useNavigate();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const debitAccountId = methods.watch("account_id");
  const creditAccountId = methods.watch("counter_account_id");

  const isValid =
    methods.formState.isValid && creditAccountId && debitAccountId;

  const { createData } = useCreate();
  const { data: accounts, loading: accountLoading } = useGetAllAccount();

  /** account only posting */
  const accountsFiltered = accounts?.filter((item) => item.is_posting == true);
  const accountOptions = useMapInputOptions(accountsFiltered);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createData(state);
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
          <DatePicker
            label="Tgl. transaksi"
            id="date"
            name="date"
            defaultDate={new Date()}
            required
          />
          <Input
            label="Nominal (IDR)"
            type="number"
            placeholder="Nominal transaksi"
            name="amount"
            required
          />

          <Input
            label="Nomor transaksi"
            placeholder="Nomor transaksi"
            name="document_number"
            required
          />
          <Input
            label="Nomor referensi"
            placeholder="Nomor referensi"
            name="reff"
            required
          />

          <TextArea
            label="Deskripsi"
            name="description"
            placeholder="Deskripsi"
            required
          />
          <TextArea
            label="Catatan"
            name="remarks"
            placeholder="Catatan tambahan"
            required
          />

          <Skeleton isLoading={accountLoading}>
            <SelectTwo
              label="Akun debit"
              name="account_id"
              placeholder="--- Pilih Akun Debit ---"
              selectTwoOptions={accountOptions}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
          <Skeleton isLoading={accountLoading}>
            <SelectTwo
              label="Akun kredit"
              name="counter_account_id"
              placeholder="--- Pilih Akun Kredit ---"
              selectTwoOptions={accountOptions}
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
