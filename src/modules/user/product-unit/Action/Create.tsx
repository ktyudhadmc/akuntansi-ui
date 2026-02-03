import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { slugify } from "@helpers/get-initial";

import Form from "@components/form/Form";
import { Modal } from "@components/ui/modal";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import Spinner from "@components/Reusable/Spinner";

import useCreate from "@services/user/product/unit/hooks/useCreate";
import type { ICreateProductUnitPayload } from "@services/user/product/unit/interfaces/request.type";
import type { Unit } from "@services/user/product/unit/interfaces/response.type";
import useUpdate from "@services/user/product/unit/hooks/useUpdate";

interface Props {
  item?: Unit;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateProductUnitPayload;

export default function ProductUnitCreate({ item, onOpen, onClose }: Props) {
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const isCreate = !item;

  const { createData } = useCreate();
  const { updateData } = useUpdate(item?.id as string);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const payload = {
      ...state,
      code: slugify(state.name),
    };

    const { error, response } = isCreate
      ? await createData(payload)
      : await updateData(payload);

    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan data!");
      } else {
        methods.reset();
        toast.success("Berhasil menyimpan data!");
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={onOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Tambah satuan
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Satuan (unit) produk / material.
          </p>
        </div>
        <Form {...methods} onSubmit={onSubmit}>
          <Input
            label="Nama"
            name="name"
            placeholder="Nama satuan"
            defaultValue={item?.name}
            required
          />

          <div className="flex items-center gap-3 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Batalkan
            </Button>
            <Button
              type="submit"
              size="sm"
              className="w-full"
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
