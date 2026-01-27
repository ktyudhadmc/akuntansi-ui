import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@components/ui/modal";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import Checkbox from "@components/form/input/Checkbox";

import useOpen from "@services/user/account-periods/hooks/useOpen";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = { date: string; accept: boolean };

export default function SettingAccountOpen({ onOpen, onClose }: Props) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { openData } = useOpen();

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const [year, month] = state.date.split("-");

    const { error, response } = await openData({
      year: Number(year),
      month: Number(month),
    });

    if (error || response) {
      if (error) {
        toast.error("Gagal membuka periode!");
      } else {
        methods.reset();
        onClose();
        toast.success("Berhasil membuka periode!");
      }
    }
  };

  return (
    <Modal isOpen={onOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Buka periode
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Proses buka periode akan membuka kembali akses pengeditan transaksi
            dan laporan keuangan pada periode yang sebelumnya telah ditutup.
            Perubahan dapat memengaruhi hasil laporan keuangan.
          </p>
        </div>
        <Form {...methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-8">
            <Input
              label="Periode"
              type="month"
              name="date"
              max={currentMonth}
              required
            />

            <Checkbox
              label="Saya memahami bahwa membuka periode dapat mengubah laporan keuangan"
              name="accept"
              value="1"
              required
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button
              type="button"
              onClick={onClose}
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
    </Modal>
  );
}
