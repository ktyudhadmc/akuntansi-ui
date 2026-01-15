/** package */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/** component */
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import Select from "@components/form/Select";
import TextArea from "@components/form/input/TextArea";

/** services */
import useGetProduct from "@services/user/product/index/hooks/useGet";
import useUpdate from "@services/user/product/index/hooks/useUpdate";
import type { ICreateProductPayload } from "@services/user/product/index/interfaces/request.type";

import { categoryOptions } from "./select-options.constants";

type FormFields = ICreateProductPayload;

export default function EditSupplier() {
  const navigate = useNavigate();
  const params = useParams();

  /** methods form */
  const methods = useForm<FormFields>({ mode: "onChange", });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  /** call api */
  const { data, loading } = useGetProduct(params.id as string);
  const { updateData } = useUpdate(params.id as string);

  /** on submit */
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
              label="Kode produk"
              placeholder="Kode produk"
              name="code"
              defaultValue={data?.code}
              required
            />
          </Skeleton>

          <Skeleton isLoading={loading}>
            <Select label="Kategori" placeholder="--- Pilih Kategori ---" name="category" options={categoryOptions} defaultValue={data?.class} required />
          </Skeleton>
        </div>
        <Skeleton isLoading={loading}>
          <Input label="Nama" placeholder="Nama produk" name="name" defaultValue={data?.name} required />
        </Skeleton>

        <Skeleton isLoading={loading}>
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi/spesifikasi produk"
            name="specification"
            defaultValue={data?.specification}
            required
          />
        </Skeleton>

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
