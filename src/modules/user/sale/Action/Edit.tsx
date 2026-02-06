import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  useFieldArray,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useMapInputOptions from "@hooks/useMapInputOptions";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import DatePicker from "@components/form/date-picker";
import SelectTwo from "@components/form/SelectTwo";
import Select from "@components/form/Select";

import useGetSale from "@services/user/sale/hooks/useGet";
import useUpdate from "@services/user/sale/hooks/useUpdate";
import useGetAllUnit from "@services/user/product/unit/hooks/useGetAll";
import useGetAllAccount from "@services/user/account/index/hooks/useGetAll";
import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import useGetAllCustomer from "@services/user/customer/hooks/useGetAll";
import useGetAllService from "@services/user/service/hooks/useGetAll";
import useGetAllTax from "@services/user/tax/hooks/useGetAll";
import type {
  CreateSaleItem,
  ICreateSalePayload,
} from "@services/user/sale/interfaces/request.type";
import useGoBack from "@hooks/useGoBack";
import { HiPlus, HiTrash } from "react-icons/hi";
import SelectTwoRhf from "@components/form/SelectTwoRhf";
import SearchInput from "@components/form/default/SearchInput";
import { formatIDRLocale } from "@helpers/currency";

type FormFields = ICreateSalePayload;

type TaxSummary = {
  tax_id: string;
  tax_name: string;
  rate: number;
  taxable_amount: number;
  tax_amount: number;
};

export default function EditSale() {
  const navigate = useNavigate();
  const params = useParams();
  const goBack = useGoBack();

  /** initial purchase */
  const emptySaleItem: CreateSaleItem = {
    material_id: undefined,
    unit_of_measure_id: undefined,
    counter_account_id: undefined,
    service_type_id: undefined,
    qty: undefined,
    price: undefined,
    tax_id: undefined,
    tax_amount: 0, // hardcode, mustinya tax_id aja
  };

  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      items: [emptySaleItem],
    },
  });

  const { control } = methods;
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { data, loading } = useGetSale(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  const { data: units, loading: unitLoading } = useGetAllUnit();
  const { data: accounts, loading: accountLoading } = useGetAllAccount();
  const { data: products, loading: productLoading } = useGetAllProduct();
  const { data: customers, loading: customerLoading } = useGetAllCustomer();
  const { data: services, loading: serviceLoading } = useGetAllService();
  const { data: taxes, loading: taxLoading } = useGetAllTax();

  const unitOptions = useMapInputOptions(units);
  const accountOptions = useMapInputOptions(accounts);
  const productOptions = useMapInputOptions(products);
  const customerOptions = useMapInputOptions(customers);
  const serviceOptions = useMapInputOptions(services);
  const taxOptions = useMapInputOptions(taxes);

  const fieldSaleItems = useFieldArray({ control, name: "items" });
  const watchedSaleItems = useWatch({ control, name: "items" });

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

  /** calculate sub-total */
  const calculateSubtotal = (
    qty: number | null | undefined,
    price: number | null | undefined,
  ): number => {
    const safeQty = qty ?? 0;
    const safePrice = price ?? 0;

    return safeQty * safePrice;
  };

  const taxSummaries: TaxSummary[] = useMemo(() => {
    if (!watchedSaleItems) return [];

    const map = new Map<string, TaxSummary>();

    for (const item of watchedSaleItems) {
      if (!item.tax_id) continue;

      const subtotal = calculateSubtotal(item.qty, item.price);
      if (subtotal === 0) continue;

      const tax = taxes?.find((t) => t.id == item.tax_id);
      if (!tax) continue;

      if (!map.has(item.tax_id)) {
        map.set(item.tax_id, {
          tax_id: tax.id,
          tax_name: tax.name,
          rate: tax.rate,
          taxable_amount: 0,
          tax_amount: 0,
        });
      }

      const row = map.get(item.tax_id)!;
      row.taxable_amount += subtotal;
      row.tax_amount = (row.taxable_amount * row.rate) / 100;
    }

    return Array.from(map.values());
  }, [watchedSaleItems, taxes]);

  /** calculate sub-total */
  const subTotal = useMemo(() => {
    return (
      watchedSaleItems?.reduce(
        (sum, item) => sum + calculateSubtotal(item.qty, item.price),
        0,
      ) ?? 0
    );
  }, [watchedSaleItems]);

  const totalTax = useMemo(() => {
    return taxSummaries.reduce((sum, tax) => sum + tax.tax_amount, 0);
  }, [taxSummaries]);

  /** calculate grand-total */
  const grandTotal = subTotal + totalTax;
  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="lg:w-1/2 w-full pr-2">
          <Skeleton isLoading={loading}>
            <Input
              label="Nomor dokumen"
              placeholder="Nomor dokumen pembelian"
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
          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwo
              label="Akun debit"
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

          <Skeleton isLoading={customerLoading || loading}>
            <SelectTwo
              label="Pelanggan"
              name="customer_id"
              placeholder="--- Pilih Pelanggan ---"
              selectTwoOptions={customerOptions}
              defaultValue={{
                label: data?.customer.name,
                value: data?.customer.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
        </div>
        {/* <Skeleton isLoading={accountLoading || loading}>
          <SelectTwo
            label="Akun kredit"
            name="counter_account_id"
            placeholder="--- Pilih Akun Kredit ---"
            selectTwoOptions={accountOptions}
            defaultValue={{
              label: data?.counter_account.name,
              value: data?.counter_account.id,
            }}
            isSearchable
            isClearable
            isRequired
          />
        </Skeleton>

        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={serviceLoading || loading}>
            <Select
              label="Layanan"
              placeholder="--- Pilih Layanan ---"
              name="service_type_id"
              options={serviceOptions}
              defaultValue={data?.service_type.id}
              required
            />
          </Skeleton>

          <Skeleton isLoading={productLoading || loading}>
            <SelectTwo
              label="Material"
              name="material_id"
              placeholder="--- Pilih Material ---"
              selectTwoOptions={productOptions}
              defaultValue={{
                label: data?.material.name,
                value: data?.material.id,
              }}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Skeleton isLoading={loading}>
            <Input
              label="Kuantitas"
              placeholder="Kuantitas"
              type="number"
              name="qty"
              defaultValue={data?.qty}
              required
            />
          </Skeleton>

          <Skeleton isLoading={unitLoading || loading}>
            <Select
              label="Satuan"
              placeholder="--- Pilih Satuan ---"
              name="unit_of_measure_id"
              options={unitOptions}
              defaultValue={data?.unit.id}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="Harga satuan"
              placeholder="Harga satuan"
              type="number"
              name="price"
              defaultValue={data?.price}
              required
            />
          </Skeleton>
        </div> */}

        {/* Produk / Material */}
        <div className="my-4">
          <h5 className="font-semibold dark:text-white mb-4">
            Produk
            <Button
              type="button"
              size="xs"
              variant="outline"
              className="ml-4"
              onClick={() => fieldSaleItems.append(emptySaleItem)}
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
                      Layanan
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Produk
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
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Pajak
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Jumlah
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {fieldSaleItems.fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="px-2 py-3">
                        <div className="md:w-48 w-xs whitespace-nowrap">
                          <Skeleton isLoading={serviceLoading}>
                            <Select
                              placeholder="--- Pilih Layanan ---"
                              name={`items[${index}][service_type_id]`}
                              options={serviceOptions}
                              className="w-full"
                              required
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="md:w-96 w-xs whitespace-nowrap">
                          <Skeleton isLoading={productLoading}>
                            <SelectTwoRhf
                              placeholder="--- Pilih Produk ---"
                              name={`items[${index}][material_id]`}
                              selectTwoOptions={productOptions}
                              isSearchable
                              isClearable
                              isRequired
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-2 py-3 ">
                        <div className="md:w-32 w-24 whitespace-nowrap">
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
                      <td className="px-2 py-3">
                        <div className="md:w-52 w-48 whitespace-nowrap">
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
                      <td className="px-2 py-3">
                        <div className="md:w-52 w-48 whitespace-nowrap">
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
                      <td className="px-2 py-3">
                        <div className="w-48 whitespace-nowrap">
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
                      <td className="px-2 py-3">
                        <div className="w-48 whitespace-nowrap">
                          <Skeleton isLoading={taxLoading}>
                            <Select
                              placeholder="--- Pilih Pajak ---"
                              name={`items[${index}][tax_id]`}
                              options={taxOptions}
                              className="w-full"
                              required
                            />
                          </Skeleton>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-end">
                        <div className="w-48 whitespace-nowrap">
                          <SearchInput
                            className="text-end"
                            readOnly
                            leftIcon={
                              <span className="font-medium text-sm">Rp</span>
                            }
                            value={formatIDRLocale(
                              calculateSubtotal(
                                watchedSaleItems?.[index]?.qty,
                                watchedSaleItems?.[index]?.price,
                              ),
                            )}
                          />
                        </div>
                      </td>
                      <td className="px-2 py-3 md:w-fit">
                        {fieldSaleItems.fields.length > 1 && (
                          <Button
                            type="button"
                            size="md"
                            variant="outline"
                            onClick={() => fieldSaleItems.remove(index)}
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
            onClick={goBack}
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
