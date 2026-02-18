import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import useUserStore from "@store/useUserStore";

import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Button from "@components/ui/button/Button";
// import DatePicker from "@components/form/date-picker";

import useMapInputOptions from "@hooks/useMapInputOptions";
import Label from "@components/form/Label";

import useGetAll from "@services/user/customer/hooks/useGetAll";
import SelectTwoRhf from "@components/form/SelectTwoRhf";
import Input from "@components/form/input/InputField";

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

  // const startTransactionDate = useUserStore(
  //   (state) => state.saleStartTransactionDate,
  // );
  // const endTransactionDate = useUserStore(
  //   (state) => state.saleEndTransactionDate,
  // );
  // const startDueDate = useUserStore((state) => state.saleStartDueDate);
  // const endDueDate = useUserStore((state) => state.saleEndDueDate);
  const customer = useUserStore((state) => state.customer);

  // const setStartTransactionDate = useUserStore(
  //   (state) => state.setStartTransactionDate,
  // );
  // const setEndTransactionDate = useUserStore(
  //   (state) => state.setEndTransactionDate,
  // );
  // const setStartDueDate = useUserStore((state) => state.setStartDueDate);
  // const setEndDueDate = useUserStore((state) => state.setEndDueDate);
  // const setCustomer = useUserStore((state) => state.setCustomer);

  const { data: customers, loading: customerLoading } = useGetAll();
  const customerOptions = useMapInputOptions(customers);

  const methods = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = async (state) => {
    // setStartTransactionDate(state.start_date);
    // setEndTransactionDate(state.end_date);
    // setStartDueDate(state.start_due_date);
    // setEndDueDate(state.end_due_date);
    // setCustomer(state.customer);

    // onClose();

    console.log(state);
  };

  const onClear = () => {
    methods.reset({
      customer: null,
      start_date: null,
      end_date: null,
      start_due_date: null,
      end_due_date: null,
    });
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
          defaultValue={new Date()}
          onChange={(selectedDates) => {
            if (selectedDates.length > 0) {
              // console.log(selectedDates[0].toISOString().split("T")[0]);
              console.log(selectedDates);
            }
          }}
        /> */}

        {/* <Label>Tgl. transaksi</Label>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            id="start_date"
            name="start_date"
            placeholder="Tanggal mulai"
            defaultValue={startTransactionDate}
          />
          <DatePicker
            id="end_date"
            name="end_date"
            placeholder="Tanggal selesai"
            defaultValue={endTransactionDate}
          />
        </div> */}

        {/* <Label>Tgl. tempo</Label>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            id="start_due_date"
            name="start_due_date"
            placeholder="Tanggal mulai"
            defaultValue={startDueDate}
          />
          <DatePicker
            id="end_due_date"
            name="end_due_date"
            placeholder="Tanggal selesai"
            defaultValue={endDueDate}
          />
        </div> */}

        <Label>Tgl. transaksi</Label>
        <Input type="month" name="date" />

        <SelectTwoRhf
          label="Pelanggan"
          name="customer"
          selectTwoOptions={customerOptions}
          defaultValue={customer}
          isLoading={customerLoading}
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
