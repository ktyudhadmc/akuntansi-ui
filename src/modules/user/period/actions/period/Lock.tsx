import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";

import { todayYMString } from "@helpers/date";
import useGoBack from "@hooks/useGoBack";

// import DatePicker from "@components/form/date-picker";
import Form from "@components/form/Form";
import Checkbox from "@components/form/input/Checkbox";
import Spinner from "@components/Reusable/Spinner";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button/Button";
import useClose from "@services/user/period/hooks/useClose";
import Input from "@components/form/input/InputField";

// type FormFields = { start_date: string; end_date: string; accept: boolean };
type FormFields = { period_date: string; accept: boolean };

export default function Lock() {
  const goBack = useGoBack();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { closeData } = useClose();

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const [year, month] = state.period_date.split("-");

    const { error, response } = await closeData({
      year: Number(year),
      month: Number(month),
    });

    if (error || response) {
      if (error) {
        toast.error("Gagal menutup periode!");
      } else {
        methods.reset();
        goBack();
        toast.success("Berhasil menutup periode!");
      }
    }
  };
  return (
    <div className="lg:max-w-md mx-auto">
      <Alert
        variant="warning"
        message="Setelah periode terkunci, Anda tidak dapat membuat, mengubah, dan menghapus transaksi"
      />

      <Form {...methods} onSubmit={onSubmit} className="mt-6">
        <div className="flex flex-col gap-8">
          {/* <DatePicker
            label="Tgl. mulai"
            name="start_date"
            defaultValue={todayYMDString}
            required
            disabled
          /> */}
          {/* <DatePicker
            label="Tgl. selesai"
            name="end_date"
            defaultValue={todayYMDString}
            mode="month"
            required
          /> */}
          <Input
            label="Tgl. Kunci Periode"
            name="period_date"
            defaultValue={todayYMString}
            type="month"
            required
          />

          <Checkbox
            label="Saya memahami bahwa periode yang sudah ditutup tidak dapat diubah"
            name="accept"
            value="1"
            required
          />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            onClick={goBack}
            className="uppercase md:w-auto w-full"
            size="sm"
            variant="outline"
          >
            Batalkan
          </Button>
          <Button
            type="submit"
            className=" uppercase md:w-auto w-full"
            size="sm"
            disabled={!isValid || isSubmitting}
          >
            {!isSubmitting ? "Simpan" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
