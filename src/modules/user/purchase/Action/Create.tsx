import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import useMapInputOptions from "@hooks/useMapInputOptions";
import useGetAllUnit from "@services/user/product/unit/hooks/useGetAll";
import useGetAllAccount from "@services/user/account/hooks/useGetAll";
import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import useGetAllSupplier from "@services/user/supplier/hooks/useGetAll";
import useCreate from "@services/user/purchase/hooks/useCreate";
import type { ICreatePurchasePayload } from "@services/user/purchase/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "@components/form/Select";
import SelectTwo from "@components/form/SelectTwo";
import Skeleton from "@components/Skeleton/Skeleton";
import DatePicker from "@components/form/date-picker";

type FormFields = ICreatePurchasePayload;

export default function CreatePurchase() {
  const navigate = useNavigate();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { createData } = useCreate();

  const { data: units, loading: unitLoading } = useGetAllUnit();
  const { data: accounts, loading: accountLoading } = useGetAllAccount();
  const { data: products, loading: productLoading } = useGetAllProduct();
  const { data: suppliers, loading: supplierLoading } = useGetAllSupplier();

  const unitOptions = useMapInputOptions(units);
  const accountOptions = useMapInputOptions(accounts);
  const productOptions = useMapInputOptions(products);
  const supplierOptions = useMapInputOptions(suppliers);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createData(state);

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
        <Input
          label="Nomor dokumen"
          placeholder="Nomor dokumen pembelian"
          name="document_number"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePicker label="Tgl. transaksi" id="date" name="date" required />
          <DatePicker
            label="Tgl. tempo"
            id="due_date"
            name="due_date"
            required
          />
        </div>

        <Skeleton isLoading={supplierLoading}>
          <SelectTwo
            label="Supplier"
            name="supplier_id"
            selectTwoOptions={supplierOptions}
            isSearchable
            isClearable
          />
        </Skeleton>

        <Skeleton isLoading={productLoading}>
          <SelectTwo
            label="Material"
            name="material_id"
            selectTwoOptions={productOptions}
            isSearchable
            isClearable
            isRequired
          />
        </Skeleton>

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="Kuantitas"
            placeholder="Kuantitas"
            type="number"
            name="qty"
            required
          />

          <Skeleton isLoading={unitLoading}>
            <Select
              label="Satuan"
              placeholder="--- Pilih Satuan ---"
              name="unit_of_measure_id"
              options={unitOptions}
            />
          </Skeleton>

          <Input
            label="Harga satuan"
            placeholder="Harga satuan"
            type="number"
            name="price"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Skeleton isLoading={accountLoading}>
            <SelectTwo
              label="Akun debit"
              name="account_id"
              selectTwoOptions={accountOptions}
              isSearchable
              isClearable
              isRequired
            />
          </Skeleton>
          <Skeleton isLoading={accountLoading}>
            <SelectTwo
              label="Akun kredit"
              name="counter_account_id"
              selectTwoOptions={accountOptions}
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
