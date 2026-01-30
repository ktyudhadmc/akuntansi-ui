import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import SelectTwoRhf from "@components/form/SelectTwoRhf";

import useGetAll from "@services/user/account/index/hooks/useGetAll";
import useCreate from "@services/user/tax/hooks/useCreate";
import type { ICreateTaxPayload } from "@services/user/tax/interfaces/request.type";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Skeleton from "@components/Skeleton/Skeleton";

type FormFields = ICreateTaxPayload;

export default function TaxCreate() {
  const navigate = useNavigate();

  const { createData } = useCreate();
  const { data: accounts, loading: accountLoading } = useGetAll();
  const accountOptions = useMapInputOptions(accounts);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input label="Nama" placeholder="Nama pajak" name="name" required />
          <Input
            label="Persentase pajak"
            placeholder="Persentase pajak efektif"
            name="rate"
            type="number"
            step={0.01}
            min={0.01}
            max={100}
            required
          />

          <Skeleton isLoading={accountLoading}>
            <SelectTwoRhf
              label="Akun pajak penjualan"
              name="sale_account_id"
              selectTwoOptions={accountOptions}
              isClearable
              isSearchable
              isRequired
            />
          </Skeleton>
          <Skeleton isLoading={accountLoading}>
            <SelectTwoRhf
              label="Akun pajak pembelian"
              name="purchase_account_id"
              selectTwoOptions={accountOptions}
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
