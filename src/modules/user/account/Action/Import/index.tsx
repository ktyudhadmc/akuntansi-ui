import Select from "@components/form/Select";
import { useForm, type SubmitHandler } from "react-hook-form";
import { bankOptions } from "../select-options.constants";
import Form from "@components/form/Form";
import ImportDropZoneAccount from "./DropZone";
import useGetAll from "@services/user/account/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Button from "@components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import Skeleton from "@components/Skeleton/Skeleton";

export default function ImportAccount() {
  const navigate = useNavigate();

  const methods = useForm({ mode: "onChange" });
  const onSubmit: SubmitHandler<any> = async (state) => {
    console.log(state);
  };

  const { data: dataAccount, loading } = useGetAll();
  const accountOptions = useMapInputOptions(dataAccount);

  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <Select
          label="Bank"
          placeholder="--- Pilih Bank ---"
          name="bank_id"
          options={bankOptions}
          required
        />

        <Skeleton isLoading={loading}>
          <Select
            label="Nama Akun"
            placeholder="--- Pilih Nama Akun ---"
            name="account_id"
            options={accountOptions}
            required
          />
        </Skeleton>

        <ImportDropZoneAccount />

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
          <Button type="submit" className=" uppercase" size="sm">
            Kirim
          </Button>
        </div>
      </Form>
    </div>
  );
}
