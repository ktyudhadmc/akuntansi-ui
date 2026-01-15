import Form from "@components/form/Form";
import Checkbox from "@components/form/input/Checkbox";
import Input from "@components/form/input/InputField";
import Label from "@components/form/Label";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import type { ICreateContactPayload } from "@services/user/contact/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormFields = ICreateContactPayload;

export default function EditContact() {
  const navigate = useNavigate();
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const contactType =
    methods.watch("is_customer") || methods.watch("is_supplier");
  const isValid = methods.formState.isValid && contactType;

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    console.log(state);
    // const { error, response } = await createData({ ...state, company_id: 1 });
    // if (error || response) {
    //   if (error) {
    //     toast.error("Gagal menyimpan data!");
    //   } else {
    //     methods.reset();
    //     navigate(-1);
    //     toast.success("Berhasil menyimpan data!");
    //   }
    // }
  };

  return (
    <div>
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Nama kontak"
            placeholder="nama kontak"
            name="name"
            required
          />
          <Input
            label="Nomor handphone"
            placeholder="Contoh: 08129374546"
            name="phone"
            required
          />
          <Input
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
            {!isSubmitting ? "Simpan" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
