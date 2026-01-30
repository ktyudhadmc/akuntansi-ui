import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useMapInputOptions from "@hooks/useMapInputOptions";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import SelectTwoRhf from "@components/form/SelectTwoRhf";
import Skeleton from "@components/Skeleton/Skeleton";

import useGetAll from "@services/user/account/index/hooks/useGetAll";
import useUpdate from "@services/user/tax/hooks/useUpdate";
import useGetTax from "@services/user/tax/hooks/useGet";
import type { ICreateTaxPayload } from "@services/user/tax/interfaces/request.type";

type FormFields = ICreateTaxPayload;

export default function TaxEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, loading } = useGetTax(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  const { data: accounts, loading: accountLoading } = useGetAll();
  const accountOptions = useMapInputOptions(accounts);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Skeleton isLoading={loading}>
            <Input
              label="Nama"
              placeholder="Nama pajak"
              name="name"
              defaultValue={data?.name}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="Persentase pajak"
              placeholder="Persentase pajak efektif"
              name="rate"
              type="number"
              step={0.01}
              min={0.01}
              max={100}
              defaultValue={data?.rate}
              required
            />
          </Skeleton>

          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwoRhf
              label="Akun pajak penjualan"
              name="sale_account_id"
              selectTwoOptions={accountOptions}
              defaultValue={data?.sales_account.id}
              isClearable
              isSearchable
              isRequired
            />
          </Skeleton>
          <Skeleton isLoading={accountLoading || loading}>
            <SelectTwoRhf
              label="Akun pajak pembelian"
              name="purchase_account_id"
              selectTwoOptions={accountOptions}
              defaultValue={data?.purchase_account.id}
              isClearable
              isSearchable
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
            {!isSubmitting ? "Simpan" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
