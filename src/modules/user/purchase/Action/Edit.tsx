import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
// import type { ICreatePurchasePayload } from "@services/user/purchase/interfaces/request.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// type FormFields = ICreatePurchasePayload;
type FormFields = {
  name: string;
};
export default function EditPurchase() {
  const navigate = useNavigate();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;

  const isValid = methods.formState.isValid;

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
        <Skeleton isLoading={true}>
          <Input label="Nama" placeholder="Nama" name="name" required />
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
            {!isSubmitting ? "Kirim" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
