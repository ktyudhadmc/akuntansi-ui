import Form from "@components/form/Form";

import Input from "@components/form/input/InputField";
import Select from "@components/form/Select";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import useCreate from "@services/user/product/index/hooks/useCreate";
import type { ICreateProductPayload } from "@services/user/product/index/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryOptions } from "./select-options.constants";
import TextArea from "@components/form/input/TextArea";

type FormFields = ICreateProductPayload;

export default function CreateProduct() {
  const navigate = useNavigate();
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

  const { createData } = useCreate();

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
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Kode produk"
            placeholder="Kode produk"
            name="code"
            required
          />
          <Select label="Kategori" placeholder="--- Pilih Kategori ---" name="category" options={categoryOptions} required />

        </div>
        <Input label="Nama" placeholder="Nama produk" name="name" required />

        <TextArea
          label="Deskripsi"
          placeholder="Deskripsi/spesifikasi produk"
          name="specification"
          required
        />

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
