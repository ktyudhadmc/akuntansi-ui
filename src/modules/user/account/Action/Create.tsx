import { useNavigate } from "react-router-dom";
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
} from "./select-options.constants";

import useCreate from "@services/user/account/hooks/useCreate";
import type { ICreateAccountPayload } from "@services/user/account/interfaces/request.type";

type FormFields = ICreateAccountPayload;

export default function CreateAccount() {
  const navigate = useNavigate();
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { createData } = useCreate();

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    console.log(state);
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
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Kode akun" name="code" required />
          <Input label="Nama akun" name="name" required />

          <Select
            label="Saldo Normal"
            name="normal_balance"
            placeholder="--- Pilih Saldo ---"
            options={normalBalanceOptions}
            required
          />
          <Select
            label="Jenis Laporan"
            name="report_type"
            placeholder="--- Pilih Jenis ---"
            options={reportTypeOptions}
            required
          />
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
