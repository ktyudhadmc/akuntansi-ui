import { useEffect, useMemo } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  useFieldArray,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useMapInputOptions from "@hooks/useMapInputOptions";
import { formatIDRLocale } from "@helpers/currency";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";

import DatePicker from "@components/form/date-picker";
import SelectTwo from "@components/form/SelectTwo";
import TextArea from "@components/form/input/TextArea";
import SelectTwoRhf from "@components/form/SelectTwoRhf";
import SearchInput from "@components/form/default/SearchInput";

import useGetPurchase from "@services/user/purchase/hooks/useGet";
import useUpdate from "@services/user/purchase/hooks/useUpdate";
import useGetAllUnit from "@services/user/product/unit/hooks/useGetAll";
import useGetAllAccount from "@services/user/account/index/hooks/useGetAll";
import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import useGetAllSupplier from "@services/user/supplier/hooks/useGetAll";
import type {
  ICreatePurchasePayload,
  PurchaseItem,
} from "@services/user/purchase/interfaces/request.type";
import { responseToRequest } from "@services/user/purchase/interfaces/request.mapper";

type FormFields = ICreatePurchasePayload;

export default function EditPurchase() {
  const navigate = useNavigate();
  const params = useParams();

  /** initial purchase */
  const emptyPurchaseItem: PurchaseItem = {
    material_id: undefined,
    unit_of_measure_id: undefined,
    counter_account_id: undefined,
    qty: undefined,
    price: undefined,
  };

  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      items: [emptyPurchaseItem],
    },
  });

  const { control, reset } = methods;
  const { isSubmitting, isDirty } = methods.formState;
  const isValid = methods.formState.isValid;

  const { data, loading } = useGetPurchase(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  const { data: units, loading: unitLoading } = useGetAllUnit();
  const { data: accounts, loading: accountLoading } = useGetAllAccount();
  const { data: products, loading: productLoading } = useGetAllProduct();
  const { data: suppliers, loading: supplierLoading } = useGetAllSupplier();

  const unitOptions = useMapInputOptions(units);
  const accountOptions = useMapInputOptions(accounts);
  const productOptions = useMapInputOptions(products);
  const supplierOptions = useMapInputOptions(suppliers);

  const fieldPurchaseItems = useFieldArray({ control, name: "items" });
  const watchedPurchaseItems = useWatch({ control, name: "items" });

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateData(state);
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

  useEffect(() => {
    if (!data) return;
    reset(responseToRequest(data));
  }, [data, reset]);

  const removeItems = (index: any) => {
    fieldPurchaseItems.remove(index);

    const current = methods.getValues("items").filter(Boolean);

    methods.setValue("items", current, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /** calculate sub-total */
  const calculateSubtotal = (
    qty: number | null | undefined,
    price: number | null | undefined,
  ): number => {
    const safeQty = qty ?? 0;
    const safePrice = price ?? 0;

    return safeQty * safePrice;
  };

  /** calculate grand-total */
  const grandTotal = useMemo(() => {
    // belum ada perubahan → pakai data server
    if (!isDirty) return data?.total_amount ?? 0;

    return fieldPurchaseItems.fields.reduce((total, field, index) => {
      const item = watchedPurchaseItems?.[index];

      const qty = item?.qty ?? field.qty ?? 0;
      const price = item?.price ?? field.price ?? 0;

      return total + qty * price;
    }, 0);
  }, [
    isDirty,
    fieldPurchaseItems.fields,
    watchedPurchaseItems,
    data?.total_amount,
  ]);

  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="lg:w-1/2 w-full pr-2">
          <Skeleton isLoading={loading}>
            <Input
              label="Nomor dokumen"
              placeholder="Nomor dokumen pembelian"
              id="document_number"
              name="document_number"
              defaultValue={data?.document_number}
              required
            />
          </Skeleton>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. transaksi"
              id="date"
              name="date"
              defaultValue={data?.date}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. tempo"
              id="due_date"
              name="due_date"
              defaultValue={data?.due_date}
              required
            />
          </Skeleton>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={supplierLoading || loading}>
            <SelectTwo
              label="Supplier"
              id="supplier_id"
              name="supplier_id"
              placeholder="--- Pilih Supplier ---"
              selectTwoOptions={supplierOptions}
              defaultValue={{
                label: data?.supplier.name,
                value: data?.supplier.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>

          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwo
              label="Akun debit"
              id="account_id"
              name="account_id"
              placeholder="--- Pilih Akun Debit ---"
              selectTwoOptions={accountOptions}
              defaultValue={{
                label: data?.account.name,
                value: data?.account.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
        </div>

        {/* Produk / Material */}
        <div className="my-4">
          <h5 className="font-semibold dark:text-white mb-4">
            Produk
            <Button
              type="button"
              size="xs"
              variant="outline"
              className="ml-4"
              onClick={() => fieldPurchaseItems.append(emptyPurchaseItem)}
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
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Akun pembelian
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Harga Satuan
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Jumlah
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {fieldPurchaseItems.fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="pl-5 pr-1 py-3">
                        <div className="w-xs whitespace-nowrap">
                          <Skeleton isLoading={productLoading || loading}>
                            <SelectTwoRhf
                              placeholder="--- Pilih Komponen Produk ---"
                              name={`items[${index}][material_id]`}
                              selectTwoOptions={productOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-1 py-3">
                        <div className="min-w-24 whitespace-nowrap">
                          <Input
                            type="number"
                            placeholder="0"
                            name={`items[${index}][qty]`}
                            min="0"
                            step={1}
                            required
                          />
                        </div>
                      </td>
                      <td className="px-1 py-3">
                        <div className="min-w-48 whitespace-nowrap">
                          <Skeleton isLoading={unitLoading}>
                            <SelectTwoRhf
                              placeholder="--- Pilih Satuan ---"
                              name={`items[${index}][unit_of_measure_id]`}
                              selectTwoOptions={unitOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-1 py-3">
                        <div className="min-w-48 whitespace-nowrap">
                          <Skeleton isLoading={accountLoading}>
                            <SelectTwoRhf
                              name={`items[${index}][counter_account_id]`}
                              placeholder="--- Pilih Akun ---"
                              selectTwoOptions={accountOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-1 py-3">
                        <div className="min-w-48 whitespace-nowrap">
                          <Input
                            type="number"
                            name={`items[${index}][price]`}
                            placeholder="0"
                            min="0"
                            step={1}
                            required
                            className="text-end"
                            leftIcon={
                              <span className="font-medium text-sm">Rp</span>
                            }
                          />
                        </div>
                      </td>
                      <td className="pl-1 pr-5 py-3 text-end">
                        <div className="min-w-48 whitespace-nowrap">
                          <SearchInput
                            className="text-end"
                            readOnly
                            leftIcon={
                              <span className="font-medium text-sm">Rp</span>
                            }
                            value={formatIDRLocale(
                              calculateSubtotal(
                                watchedPurchaseItems?.[index]?.qty ?? field.qty,
                                watchedPurchaseItems?.[index]?.price ??
                                  field.price,
                              ),
                            )}
                          />
                        </div>
                      </td>
                      {fieldPurchaseItems.fields.length > 1 && (
                        <td className="pl-1 pr-5 py-3">
                          <Button
                            type="button"
                            size="xs"
                            variant="outline"
                            onClick={() => removeItems(index)}
                          >
                            <HiTrash />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="lg:w-1/4 w-full">
            <TextArea
              label="Catatan"
              name="description"
              placeholder="Catatan pembelian"
            />
          </div>

          <div className="lg:w-1/4 w-full grid grid-cols-2">
            <h4 className="text-start font-medium text-lg dark:text-white">
              Total
            </h4>
            <p className="text-end font-medium text-lg dark:text-white">
              {formatIDRLocale(grandTotal, {
                withSymbol: true,
              })}
            </p>
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
            {!isSubmitting ? "Kirim" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
