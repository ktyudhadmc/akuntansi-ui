import Form from "@components/form/Form";
// import Checkbox from "@components/form/input/Checkbox";
import Input from "@components/form/input/InputField";
// import Label from "@components/form/Label";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import useGetCustomer from "@services/user/customer/hooks/useGet";
import useUpdate from "@services/user/customer/hooks/useUpdate";
import type { ICreateCustomerPayload } from "@services/user/customer/interfaces/request.type";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FormFields = ICreateCustomerPayload;

export default function EditCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const methods = useForm<FormFields>({
    mode: "onChange",
  });
  const { isSubmitting } = methods.formState;

  // const contactType =
  //   methods.watch("is_customer") || methods.watch("is_supplier");
  const isValid = methods.formState.isValid;

  const { data, loading } = useGetCustomer(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateData({ ...state });
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
          <Skeleton isLoading={loading}>
            <Input
              label="Kode pelanggan"
              placeholder="Kode pelanggan"
              name="code"
              defaultValue={data?.code}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="Nama induk perusahaan"
              placeholder="Nama induk perusahaan"
              name="parent_unit"
              defaultValue={data?.parent_unit}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Input
              label="Nama"
              placeholder="Nama pelanggan"
              name="name"
              defaultValue={data?.name}
              required
            />
          </Skeleton>

          {/* <Input
            label="Email"
            placeholder="Email kontak"
            name="email"
            required
          />
          <Input
            label="Alamat"
            placeholder="Alamat kontak"
            name="address"
            required
          />

          <div>
            <Label className="mb-2">
              Tipe Kontak <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Checkbox label="Pelanggan" name="is_customer" />
              <Checkbox label="Supplier" name="is_supplier" />
            </div>
          </div> */}
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
