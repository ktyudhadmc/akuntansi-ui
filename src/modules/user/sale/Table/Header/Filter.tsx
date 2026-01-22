import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Button from "@components/ui/button/Button";
import DatePicker from "@components/form/date-picker";
import SelectTwo from "@components/form/SelectTwo";
import useGetAll from "@services/user/supplier/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Label from "@components/form/Label";
import useUserStore from "@store/useUserStore";
// import Select from "@components/form/Select";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export default function Filter({ onClose, onOpen }: Props) {
  // const statusOptions = [
  //   { label: "CLOSED", value: "closed" },
  //   { label: "DRAFT", value: "draft" },
  //   { label: "APPROVED", value: "approved" },
  //   { label: "RECEIVED", value: "received" },
  //   { label: "INVOICED", value: "invoiced" },
  //   { label: "PAID", value: "paid" },
  //   { label: "CLOSED", value: "closed" },
  // ];

  const startTransactionDate = useUserStore(
    (state) => state.startTransactionDate,
  );
  const endTransactionDate = useUserStore((state) => state.endTransactionDate);
  const startDueDate = useUserStore((state) => state.startDueDate);
  const endDueDate = useUserStore((state) => state.endDueDate);

  const setStartTransactionDate = useUserStore(
    (state) => state.setStartTransactionDate,
  );
  const setEndTransactionDate = useUserStore(
    (state) => state.setEndTransactionDate,
  );
  const setStartDueDate = useUserStore((state) => state.setStartDueDate);
  const setEndDueDate = useUserStore((state) => state.setEndDueDate);

  const { data: suppliers } = useGetAll();
  const supplierOptions = useMapInputOptions(suppliers);

  const methods = useForm({ mode: "onChange" });
  // console.log(startTransactionDate);

  const onSubmit: SubmitHandler<any> = async (state) => {
    console.log(state);

    setStartTransactionDate(state.start_date);
    setEndTransactionDate(state.end_date);
    setStartDueDate(state.start_due_date);
    setEndDueDate(state.end_due_date);
  };

  const onClear = () => {
    methods.reset();
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter">
      <Form {...methods} onSubmit={onSubmit}>
        {/* transaction date */}
        {/* <DatePicker
          label="Tgl. transaksi"
          id="transaction_date"
          placeholder="YYYY-MM-DD"
          mode="single"
          defaultDate={new Date()}
          onChange={(selectedDates) => {
            if (selectedDates.length > 0) {
              // console.log(selectedDates[0].toISOString().split("T")[0]);
              console.log(selectedDates);
            }
          }}
        /> */}

        <Label>Tgl. transaksi</Label>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            id="start_date"
            name="start_date"
            defaultDate={startTransactionDate ?? new Date()}
            required
          />
          <DatePicker
            id="end_date"
            name="end_date"
            defaultDate={endTransactionDate ?? new Date()}
            required
          />
        </div>

        <Label>Tgl. tempo</Label>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            id="start_due_date"
            name="start_due_date"
            defaultDate={startDueDate ?? new Date()}
            required
          />
          <DatePicker
            id="end_due_date"
            name="end_due_date"
            defaultDate={endDueDate ?? new Date()}
            required
          />
        </div>

        <SelectTwo
          label="Supplier"
          name="supplier_id"
          selectTwoOptions={supplierOptions}
          isClearable
          isSearchable
        />

        {/* <Select
          label="Status"
          placeholder="Pilih Status"
          name="status"
          options={statusOptions}
        /> */}

        {/* button */}
        <div className="flex md:flex-row flex-col justify-between mt-4 border-t pt-8">
          <button
            className="text-md my-auto flex underline underline-offset-auto"
            type="button"
            onClick={onClear}
          >
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
