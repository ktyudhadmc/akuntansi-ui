import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Button from "@components/ui/button/Button";
import DatePicker from "@components/form/date-picker";
import SelectTwo from "@components/form/SelectTwo";
import useGetAll from "@services/user/supplier/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Select from "@components/form/Select";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export default function Filter({ onClose, onOpen }: Props) {
  const statusOptions = [
    { label: "CLOSED", value: "closed" },
    { label: "DRAFT", value: "draft" },
    { label: "APPROVED", value: "approved" },
    { label: "RECEIVED", value: "received" },
    { label: "INVOICED", value: "invoiced" },
    { label: "PAID", value: "paid" },
    { label: "CLOSED", value: "closed" },
  ];
  const { data: suppliers } = useGetAll();
  const supplierOptions = useMapInputOptions(suppliers);

  const methods = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = async (state) => {
    console.log(state);
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter Material">
      <Form {...methods} onSubmit={onSubmit}>
        {/* transaction date */}
        <DatePicker
          label="Tgl. transaksi"
          id="transaction_date"
          placeholder="YYYY-MM-DD"
          mode="range"
          defaultDate={new Date()}
          onChange={(selectedDates) => {
            if (selectedDates.length > 0) {
              // console.log(selectedDates[0].toISOString().split("T")[0]);
              console.log(selectedDates);
            }
          }}
        />

        <SelectTwo
          label="Supplier"
          name="supplier_id"
          selectTwoOptions={supplierOptions}
          isClearable
          isSearchable
          isMulti
        />

        <Select label="Status"placeholder="Pilih Status" name="status" options={statusOptions} />

        {/* button */}
        <div className="flex md:flex-row flex-col justify-between mt-4 border-t pt-8">
          <button className="text-md my-auto flex underline underline-offset-auto">
            <MdOutlineRefresh className="text-xl scale-x-[-1]" /> Reset filter
          </button>

          <div className="flex gap-2 md:mt-auto mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full"
            >
              Batalkan
            </Button>
            <Button size="sm" className="w-full">
              Filter
            </Button>
          </div>
        </div>
      </Form>
    </Drawer>
  );
}
