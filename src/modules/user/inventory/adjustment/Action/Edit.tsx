import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useMapInputOptions from "@hooks/useMapInputOptions";

import Form from "@components/form/Form";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import Skeleton from "@components/Skeleton/Skeleton";
import SelectTwo from "@components/form/SelectTwo";
import DatePicker from "@components/form/date-picker";
import Select from "@components/form/Select";
import TextArea from "@components/form/input/TextArea";

import useGetAllProduct from "@services/user/product/index/hooks/useGetAll";
import type { ICreateAdjustmentPayload } from "@services/user/inventory/adjustment/interfaces/request.type";
import { transactionType } from "@modules/user/inventory/options.constants";
import Input from "@components/form/input/InputField";
import useUpdate from "@services/user/inventory/adjustment/hooks/useUpdate";
import useGetAdjustment from "@services/user/inventory/adjustment/hooks/useGet";

type FormFields = ICreateAdjustmentPayload;

export default function AdjustmentEdit() {
  const navigate = useNavigate();
  const params = useParams();

  /** methods form */
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  /** services */
  const { data, loading } = useGetAdjustment(params.id as string);
  const { updateData } = useUpdate(params.id as string);
  const { data: products, loading: productLoading } = useGetAllProduct();
  const productOptions = useMapInputOptions(products);

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
        <Skeleton isLoading={loading || productLoading}>
          <SelectTwo
            label="Material"
            name="material_id"
            placeholder="--- Pilih Material ---"
            selectTwoOptions={productOptions}
            defaultValue={{
              label: data?.material?.name,
              value: data?.material?.id,
            }}
            isSearchable
            isClearable
            isRequired
          />
        </Skeleton>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
          <Skeleton isLoading={loading}>
            <DatePicker
              label="Tgl. penyesuaian"
              id="date"
              name="date"
              defaultDate={data?.date ?? new Date()}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Select
              label="Jenis penyesuaian"
              placeholder="--- Pilih Jenis Penyesuaian ---"
              name="type"
              options={transactionType}
              defaultValue={data?.type}
              required
            />
          </Skeleton>
          <Skeleton isLoading={loading}>
            <Input
              label="Kuantitas"
              type="number"
              name="qty"
              defaultValue={data?.qty}
              required
            />
          </Skeleton>
        </div>
        <Skeleton isLoading={loading}>
          <TextArea
            label="Deskripsi"
            name="description"
            defaultValue={data?.description}
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
