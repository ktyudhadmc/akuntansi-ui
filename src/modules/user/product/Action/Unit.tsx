import { debounce, isEmpty } from "lodash";
import { useCallback, useRef, useState } from "react";
import { HiOutlinePencil, HiPlus, HiOutlineTrash } from "react-icons/hi";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useModal } from "@hooks/useModal";
import { slugify } from "@helpers/index";

import SearchInput from "@components/form/default/SearchInput";
import Button from "@components/ui/button/Button";
import Drawer from "@components/ui/drawer";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import PopOver from "@components/ui/popover";

import useCreate from "@services/user/product/unit/hooks/useCreate";
import useDelete from "@services/user/product/unit/hooks/useDelete";
import useUpdate from "@services/user/product/unit/hooks/useUpdate";
import useGetAll from "@services/user/product/unit/hooks/useGetAll";
import type { Unit } from "@services/user/product/unit/interfaces/response.type";
import type { ICreateProductUnitPayload } from "@services/user/product/unit/interfaces/request.type";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

interface TableItemProps {
  item: Unit;
}

interface TableItemFormProps {
  item?: Unit;
  onClose: () => void;
}

type FormFields = ICreateProductUnitPayload;

export default function ProductUnit({ onOpen, onClose }: Props) {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const { data, loading, setName } = useGetAll();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setName(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  const addUnit = () => {
    setIsAdd(true);
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter" size="md">
      <div className="flex gap-2 justify-between mb-4">
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Button size="xs" variant="outline" onClick={addUnit}>
          <span className="md:block hidden">Tambah satuan</span>
          <HiPlus className="mx-1 md:hidden block" />
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Satuan
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {isAdd && <TableItemForm onClose={() => setIsAdd(false)} />}
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data?.map((item, index) => {
                  return (
                    <TableItem key={`table-product-${index}`} item={item} />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Drawer>
  );
}

function TableItem({ item }: TableItemProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { deleteData } = useDelete();

  const editUnit = () => {
    setIsEdit(true);
  };

  const onDelete = async () => {
    const { error, response } = await deleteData(item.id);
    if (error || response) {
      if (error) {
        toast.error("Gagal menghapus data!");
      } else {
        closeModal();
        toast.success("Berhasil menghapus data!");
      }
    }
  };

  return isEdit ? (
    <TableItemForm onClose={() => setIsEdit(false)} item={item} />
  ) : (
    <>
      <tr>
        <td className="w-full px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
          {item.name}
        </td>
        <td className=" px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
          <PopOver
            onOpen={isOpen}
            onClose={closeModal}
            reference={buttonRef.current}
          >
            <div className="max-w-[390px]">
              <div className="relative z-20 rounded-t-lg px-5 py-3 dark:border-white/[0.03] bg-gray-100">
                <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {item.name}
                </h4>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Apakah Anda yakin menghapus satuan?
                </p>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full shadow-theme-xs flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-600 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  >
                    Batalkan
                  </button>
                  <button
                    type="button"
                    className="w-full bg-brand-500 shadow-theme-xs hover:bg-brand-600 flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-white "
                    onClick={onDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </PopOver>

          <div className="flex gap-2 justify-end my-auto">
            {/* edit */}
            <HiOutlinePencil
              onClick={editUnit}
              className="cursor-pointer text-lg "
            />

            {/* delete */}
            <button ref={buttonRef} onClick={openModal}>
              <HiOutlineTrash className="cursor-pointer text-lg " />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

function TableItemForm({ onClose, item }: TableItemFormProps) {
  const isCreate = isEmpty(item);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

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
        onClose();
        methods.reset();
        toast.success("Berhasil menyimpan data!");
      }
    }
  };

  return (
    <tr>
      <td
        colSpan={2}
        className="w-full px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
      >
        <Form
          {...methods}
          onSubmit={onSubmit}
          className="w-full md:!flex-row flex-col"
        >
          <Input name="name" defaultValue={item?.name} />
          <div className="flex gap-2">
            {/* edit */}
            <Button
              type="button"
              onClick={onClose}
              size="xs"
              variant="outline"
              className="uppercase md:w-auto w-full"
            >
              Batalkan
            </Button>

            {/* delete */}
            <Button
              type="submit"
              className="uppercase md:w-auto w-full"
              size="xs"
              disabled={!isValid || isSubmitting}
            >
              {!isSubmitting ? "Simpan" : <Spinner />}
            </Button>
          </div>
        </Form>
      </td>
    </tr>
  );
}
