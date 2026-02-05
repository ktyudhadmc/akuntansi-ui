import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";

import useClose from "@services/user/period/hooks/useClose";
import Checkbox from "@components/form/input/Checkbox";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = { date: string; accept: boolean };

export default function SettingAccountClose({ onOpen, onClose }: Props) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { closeData } = useClose();

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const [year, month] = state.date.split("-");

    const { error, response } = await closeData({
      year: Number(year),
      month: Number(month),
    });

    if (error || response) {
      if (error) {
        toast.error("Gagal menutup periode!");
      } else {
        methods.reset();
        onClose();
        toast.success("Berhasil menutup periode!");
      }
    }
  };

  return (
    <Modal isOpen={onOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Tutup periode
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Proses tutup periode akan mengamankan data transaksi dan laporan
            keuangan pada periode terpilih. Periode yang telah ditutup tidak
            dapat dibuka kembali tanpa otorisasi.
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
              label="Saya memahami bahwa periode yang sudah ditutup tidak dapat diubah"
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
