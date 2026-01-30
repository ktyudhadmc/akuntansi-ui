import Form from "@components/form/Form";
import Checkbox from "@components/form/input/Checkbox";
import Select from "@components/form/Select";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";
import useCreateIntegration from "@services/user/account/cash-bank/hooks/useCreateIntegration";
import type { ICreateIntegrationBankAccountPayload } from "@services/user/account/cash-bank/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  id: number;
  code: string;
  name: string;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateIntegrationBankAccountPayload;

export default function AccountBankIntegrationCreate({
  id,
  code,
  name,
  onOpen,
  onClose,
}: Props) {
  const subTypeOptions = [
    { label: "Kas", value: "cash" },
    { label: "Bank", value: "bank" },
  ];

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createData } = useCreateIntegration();

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createData({ ...state, account_id: id });
    if (error || response) {
      if (error) {
        toast.error("Gagal membuat integrasi!");
      } else {
        methods.reset();
        toast.success("Berhasil membuat integrasi!");
      }
      onClose();
    }
  };

  return (
    <Modal isOpen={onOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Integrasi akun bank
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ({code}) - {name} <br />
            Akun bank / kas perusahaan terintegrasi dengan kode akun
          </p>
        </div>
        <Form {...methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-8">
            <Select
              label="Kategori"
              placeholder="--- Pilih Kategori ---"
              name="type"
              options={subTypeOptions}
              required
            />

            <Checkbox
              label="Gunakan akun ini sebagai akun bank terintegrasi"
              name="is_active"
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
