import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import type { ICreatePurchasePayload } from "@services/user/purchase/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "@components/form/date-picker";
import SelectTwo from "@components/form/SelectTwo";
import Select from "@components/form/Select";
import { toast } from "react-toastify";

import useGetPurchase from "@services/user/purchase/hooks/useGet";
import useUpdate from "@services/user/purchase/hooks/useUpdate";
import useGetAllUnit from "@services/user/product/unit/hooks/useGetAll";
import useGetAllAccount from "@services/user/account/hooks/useGetAll";
import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import useGetAllSupplier from "@services/user/supplier/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";

type FormFields = ICreatePurchasePayload;

export default function EditPurchase() {
  const navigate = useNavigate();
  const params = useParams();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

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
  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
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

        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. transaksi"
              id="date"
              name="date"
              defaultDate={data?.date}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. tempo"
              id="due_date"
              name="due_date"
              defaultDate={data?.due_date}
              required
            />
          </Skeleton>
        </div>

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

        <Skeleton isLoading={productLoading || loading}>
          <SelectTwo
            label="Material"
            id="material_id"
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

        <div className="grid md:grid-cols-3 gap-4">
          <Skeleton isLoading={loading}>
            <Input
              label="Kuantitas"
              placeholder="Kuantitas"
              type="number"
              id="qty"
              name="qty"
              defaultValue={data?.qty}
              required
            />
          </Skeleton>

          <Skeleton isLoading={unitLoading || loading}>
            <Select
              label="Satuan"
              placeholder="--- Pilih Satuan ---"
              id="unit_of_measure_id"
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
              id="price"
              name="price"
              defaultValue={data?.price}
              required
            />
          </Skeleton>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwo
              label="Akun kredit"
              id="counter_account_id"
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
