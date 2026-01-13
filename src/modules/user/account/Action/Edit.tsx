import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "@components/form/Form";
import Button from "@components/ui/button/Button";
import Spinner from "@components/Reusable/Spinner";
import Input from "@components/form/input/InputField";
import Select from "@components/form/Select";
import {
  normalBalanceOptions,
  reportTypeOptions,
  transactionalOptions,
} from "./select-options.constants";

import useUpdate from "@services/user/account/hooks/useUpdate";
import type { ICreateAccountPayload } from "@services/user/account/interfaces/request.type";
import useGetAccount from "@services/user/account/hooks/useGet";
import Skeleton from "@components/Skeleton/Skeleton";

type FormFields = ICreateAccountPayload;

export default function EditAccount() {
  const navigate = useNavigate();
  const params = useParams();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { data, loading } = useGetAccount(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateData({ ...state, company_id: 1 });
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

  console.log(data);

  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton isLoading={loading}>
            <Input
              label="Kode akun"
              name="code"
              defaultValue={data?.code}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Input
              label="Nama akun"
              name="name"
              defaultValue={data?.name}
              required
            />
          </Skeleton>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Skeleton isLoading={loading}>
            <Select
              label="Akun ini bisa dipakai transaksi?"
              name="is_posting"
              placeholder="--- Pilih ---"
              options={transactionalOptions}
              defaultValue={data?.is_posting ? "1" : "0"}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Select
              label="Saldo Normal"
              name="normal_balance"
              placeholder="--- Pilih Saldo ---"
              options={normalBalanceOptions}
              defaultValue={data?.normal_balance}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Select
              label="Jenis Laporan"
              name="report_type"
              placeholder="--- Pilih Jenis ---"
              options={reportTypeOptions}
              defaultValue={data?.report_type}
              required
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
