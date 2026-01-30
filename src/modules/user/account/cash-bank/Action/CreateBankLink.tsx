import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "@components/form/Form";
import Checkbox from "@components/form/input/Checkbox";
import Select from "@components/form/Select";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";

import useCreateIntegration from "@services/user/account/cash-bank/hooks/useCreateIntegration";
import useUpdateIntegration from "@services/user/account/cash-bank/hooks/useUpdateIntegration";
import useDeleteIntegration from "@services/user/account/cash-bank/hooks/useDeleteIntegration";
import type { Account } from "@services/user/account/cash-bank/interfaces/response.type";
import type { ICreateIntegrationBankAccountPayload } from "@services/user/account/cash-bank/interfaces/request.type";
interface Props {
  item: Account;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateIntegrationBankAccountPayload;

export default function AccountBankIntegrationCreate({
  item,
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
  const { updateData } = useUpdateIntegration(item.id.toString());
  const { deleteData } = useDeleteIntegration();

  const isCreate = item.type == null;

  const onDelete = async () => {
    if (item?.type?.id == null) return;

    const { error, response } = await deleteData(item.type?.id);
    if (error || response) {
      if (error) {
        toast.error("Gagal menghapus integrasi!");
      } else {
        onClose();
        toast.success("Berhasil menghapus integrasi!");
      }
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const payload = { ...state, account_id: item.id };
    const { error, response } = isCreate
      ? await createData(payload)
      : await updateData(payload);

    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan integrasi!");
      } else {
        methods.reset();
        toast.success("Berhasil menyimpan integrasi!");
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
            ({item.code}) - {item.name} <br />
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
              defaultValue={item.type?.type}
              required
            />

            <Checkbox
              label="Gunakan akun ini sebagai akun bank terintegrasi"
              name="is_active"
              value={item?.type?.is_active ?? "1"}
              required
            />
          </div>

          <div
            className={`flex ${isCreate ? "justify-end" : "justify-between"} mt-4 gap-2`}
          >
            {!isCreate && (
              <Button
                type="button"
                onClick={onDelete}
                className="uppercase md:w-auto w-full"
                size="sm"
                variant="outline"
              >
                Hapus integrasi
              </Button>
            )}

            <div className="flex justify-end gap-2">
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
          </div>
        </Form>
      </div>
    </Modal>
  );
}
