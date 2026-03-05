import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { isEmpty } from "lodash";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Form from "@components/form/Form";
import {
  Table,
  TableWrapper,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableLoading,
  TableNotFound,
} from "@components/ui/table";
import Button from "@components/ui/button/Button";
import Input from "@components/form/input/InputField";
import Select from "@components/form/Select";
import useGetAll from "@services/user/product/unit/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";

import useUpsertProductUnit from "@services/user/product/index/hooks/useUpsertProductUnit";
import type { IUpsertProductUnitPayload } from "@services/user/product/index/interfaces/request.type";
import type {
  ProductUnit,
  Unit,
} from "@services/user/product/index/interfaces/response.type";

interface TableItemFormProps {
  productId: number;
  unit?: Unit;
  productUnit?: ProductUnit;
  onClose?: () => void;
}
interface Props {
  loading: boolean;
  productId?: number;
  unit?: Unit;
  productUnits?: ProductUnit[];
}

type FormFields = IUpsertProductUnitPayload;

export default function ProductUnit({ loading, unit, productUnits }: Props) {
  const [isAdd, setIsAdd] = useState<boolean>(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsAdd(!isAdd)}>
        {isAdd ? "Batalkan" : "Atur Satuan"}
      </Button>

      <TableWrapper className="!rounded">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableCell isHeader className="text-start">
                Satuan Terkecil: <span className="ml-2"> {unit?.name}</span>
              </TableCell>
              <th colSpan={3}></th>
              {/* <TableCell isHeader colSpan={2} className="text-start">
              Kuantitas
            </TableCell> */}
              {/* <TableCell isHeader className="text-end">
                Harga Beli
              </TableCell>
              <TableCell isHeader className="text-end">
                Harga Jual
              </TableCell> */}
              <th></th>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdd && (
              <TableItemForm productId={1} onClose={() => setIsAdd(false)} />
            )}
            {loading ? (
              <TableLoading colSpan={4} />
            ) : isEmpty(productUnits) || !productUnits ? (
              <TableNotFound colSpan={4} />
            ) : (
              productUnits.map((item, index) => (
                <TableItemForm
                  key={`table-item-${index}`}
                  productId={1}
                  productUnit={item}
                  unit={unit}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  );
}

function TableItemForm({
  productId,
  productUnit,
  unit,
  onClose,
}: TableItemFormProps) {
  const isCreate = isEmpty(productUnit);
  const [isUpsert, setIsUpsert] = useState<boolean>(isCreate ?? false);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { data: units, loading: unitLoading } = useGetAll();
  const { upsertData } = useUpsertProductUnit(productId.toString());
  const unitOptions = useMapInputOptions(units);

  const closeUpsert = () => {
    setIsUpsert(false);
    if (isCreate && onClose) onClose();
  };

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    if (!isUpsert) return;
    const { error, response } = await upsertData(state);

    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan data!");
      } else {
        methods.reset();
        toast.success("Berhasil menyimpan data!");

        if (isCreate && onClose) onClose();

        closeUpsert();
      }
    }
  };

  return (
    <tr>
      <td
        colSpan={3}
        className="w-full px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
      >
        <Form
          {...methods}
          onSubmit={onSubmit}
          className="w-full !px-0 !flex-row justify-between"
        >
          <div className="flex gap-6">
            <span className="lg:mr-4 my-auto"> 1</span>

            <div className="w-96">
              <Skeleton isLoading={unitLoading}>
                <Select
                  placeholder="Pilih Satuan"
                  className={` !py-0 ${!isUpsert && "cursor-not-allowed"}`}
                  name="unit_id"
                  options={unitOptions}
                  defaultValue={productUnit?.unit.id}
                  disabled={!isUpsert}
                  required
                />
              </Skeleton>
            </div>
            <span className="my-auto">=</span>

            <Input
              type="number"
              name="conversion"
              className={`w-24 ${!isUpsert && "cursor-not-allowed"}`}
              defaultValue={productUnit?.conversion}
              disabled={!isUpsert}
            />
            <span className="my-auto">{unit?.name}</span>
          </div>

          <div className="flex gap-2 items-center">
            {isUpsert ? (
              <>
                {/* edit */}
                <Button
                  type="button"
                  onClick={closeUpsert}
                  size="xs"
                  variant="outline"
                  className="uppercase w-auto"
                >
                  Batalkan
                </Button>

                {/* delete */}
                <Button
                  type="submit"
                  className="uppercase w-auto"
                  size="xs"
                  disabled={!isValid || isSubmitting}
                >
                  {!isSubmitting ? "Simpan" : <Spinner />}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsUpsert(true)}
                size="xs"
                variant="outline"
                className="uppercase md:w-auto w-full"
              >
                <HiPencil /> Ubah
              </Button>
            )}
          </div>
        </Form>
      </td>
    </tr>
  );
}
