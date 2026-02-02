import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import TextArea from "@components/form/input/TextArea";

import useCreate from "@services/user/production/hooks/useCreate";
import type {
  ICreateProductionPayload,
  ProductUsage,
} from "@services/user/production/interfaces/request.type";
import DatePicker from "@components/form/date-picker";
import { HiPlus, HiTrash } from "react-icons/hi";

import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import useGetAllUnit from "@services/user/product/unit/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import SelectTwo from "@components/form/SelectTwo";

import Skeleton from "@components/Skeleton/Skeleton";

interface ProductionFormValues {
  date: string;
  description: string;
  in_items: Omit<ProductUsage, "type">[];
  out_items: Omit<ProductUsage, "type">[];
}

type FormFields = ProductionFormValues;

export default function ProductionCreate() {
  const navigate = useNavigate();

  const emptyUsage: ProductUsage = {
    material_id: "",
    unit_of_measures_id: "",
    qty: 0,
    type: "out",
  };

  const emptyResult: ProductUsage = {
    material_id: "",
    unit_of_measures_id: "",
    qty: 0,
    type: "in",
  };

  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      in_items: [emptyResult],
      out_items: [emptyUsage],
    },
  });
  const { control } = methods;
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { createData } = useCreate();
  const { data: products, loading: productLoading } = useGetAllProduct();
  const { data: units, loading: unitLoading } = useGetAllUnit();

  const productOptions = useMapInputOptions(products);
  const unitOptions = useMapInputOptions(units);

  const inFields = useFieldArray({ control, name: "in_items" });
  const outFields = useFieldArray({ control, name: "out_items" });

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    /** parse payload untuk backend :)*/
    const payload: ICreateProductionPayload = {
      date: state.date,
      description: state.description,
      items: [
        ...state.in_items.map((i) => ({ ...i, type: "in" as const })),
        ...state.out_items.map((i) => ({ ...i, type: "out" as const })),
      ],
    };

    const { error, response } = await createData(payload);
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
        <h5 className="font-semibold dark:text-white">Informasi dasar</h5>
        <div className="lg:w-1/2 flex flex-col gap-4 mb-2">
          <DatePicker
            label="Tgl. produksi"
            id="date"
            name="date"
            defaultValue={new Date()}
            required
          />
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi produksi"
            name="description"
            required
          />
        </div>
        {/* Komponen Produk / Material */}
        <div className="mb-4">
          <h5 className="font-semibold dark:text-white mb-4">
            Komponen produk
            <Button
              type="button"
              size="xs"
              variant="outline"
              className="ml-4"
              onClick={() => outFields.append(emptyUsage)}
            >
              <HiPlus />
            </Button>
          </h5>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Komponen produk
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Kuantitas
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Satuan
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {outFields.fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="px-5 py-3 md:w-5/12 ">
                        <div className="md:w-auto w-xs whitespace-nowrap">
                          <Skeleton isLoading={productLoading}>
                            <SelectTwo
                              placeholder="--- Pilih Komponen Produk ---"
                              name={`out_items[${index}][material_id]`}
                              selectTwoOptions={productOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-5 py-3 md:w-3/12">
                        <div className="md:w-auto w-[100px] whitespace-nowrap">
                          <Input
                            type="number"
                            name={`out_items[${index}][qty]`}
                            min="0"
                            step={0.1}
                            required
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 md:w-3/12">
                        <div className="md:w-auto w-[200px] whitespace-nowrap">
                          <Skeleton isLoading={unitLoading}>
                            <SelectTwo
                              placeholder="--- Pilih Satuan ---"
                              name={`out_items[${index}][unit_of_measures_id]`}
                              selectTwoOptions={unitOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-5 py-3 w-1/12">
                        {outFields.fields.length > 1 && (
                          <Button
                            type="button"
                            size="md"
                            variant="outline"
                            onClick={() => outFields.remove(index)}
                          >
                            <HiTrash />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* {outFields.fields.map((field, index) => (
            <div key={field.id} className="grid lg:grid-cols-12 gap-4 mb-3">
              <div className="lg:col-span-5">
                <Skeleton isLoading={productLoading}>
                  <SelectTwo
                    placeholder="--- Pilih Komponen Produk ---"
                    name={`out_items[${index}][material_id]`}
                    selectTwoOptions={productOptions}
                    isSearchable
                    isClearable
                    isRequired
                  />
                </Skeleton>
              </div>

              <div className="lg:col-span-3">
                <Input
                  type="number"
                  name={`out_items[${index}][qty]`}
                  min="0"
                  step={0.1}
                  required
                />
              </div>

              <div className="lg:col-span-3">
                <Skeleton isLoading={unitLoading}>
                  <SelectTwo
                    placeholder="--- Pilih Satuan ---"
                    name={`out_items[${index}][unit_of_measures_id]`}
                    selectTwoOptions={unitOptions}
                    isSearchable
                    isClearable
                    isRequired
                  />
                </Skeleton>
              </div>

              <div className="lg:col-span-1 my-auto">
                {outFields.fields.length > 1 && (
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => outFields.remove(index)}
                  >
                    <HiTrash />
                  </Button>
                )}
              </div>
            </div>
          ))} */}
        </div>

        {/* Hasil produksi */}
        <div>
          <h5 className="font-semibold dark:text-white mb-4">
            Hasil produksi
            <Button
              type="button"
              size="xs"
              variant="outline"
              className="ml-4"
              onClick={() => inFields.append(emptyResult)}
            >
              <HiPlus />
            </Button>
          </h5>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Komponen produk
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Kuantitas
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Satuan
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {inFields.fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="px-5 py-3 md:w-5/12 ">
                        <div className="md:w-auto w-xs whitespace-nowrap">
                          <Skeleton isLoading={productLoading}>
                            <SelectTwo
                              placeholder="--- Pilih Komponen Produk ---"
                              name={`in_items[${index}][material_id]`}
                              selectTwoOptions={productOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-5 py-3 md:w-3/12">
                        <div className="md:w-auto w-[100px] whitespace-nowrap">
                          <Input
                            type="number"
                            name={`in_items[${index}][qty]`}
                            min="0"
                            step={0.1}
                            required
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 md:w-3/12">
                        <div className="md:w-auto w-[200px] whitespace-nowrap">
                          <Skeleton isLoading={unitLoading}>
                            <SelectTwo
                              placeholder="--- Pilih Satuan ---"
                              name={`in_items[${index}][unit_of_measures_id]`}
                              selectTwoOptions={unitOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-5 py-3 w-1/12">
                        {inFields.fields.length > 1 && (
                          <Button
                            type="button"
                            size="md"
                            variant="outline"
                            onClick={() => inFields.remove(index)}
                          >
                            <HiTrash />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
            {!isSubmitting ? "Simpan" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
