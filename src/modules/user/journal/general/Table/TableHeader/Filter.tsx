import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Button from "@components/ui/button/Button";
import DatePicker from "@components/form/date-picker";

import Label from "@components/form/Label";
import useUserStore from "@store/useUserStore";
import Select from "@components/form/Select";
import useGetAllAccount from "@services/user/account/hooks/useGetAll";
import useMapInputOptions from "@hooks/useMapInputOptions";
import Skeleton from "@components/Skeleton/Skeleton";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export default function Filter({ onClose, onOpen }: Props) {
  const startDate = useUserStore((state) => state.startDate);
  const endDate = useUserStore((state) => state.endDate);
  const account = useUserStore((state) => state.account);

  const setStartDate = useUserStore((state) => state.setStartDate);
  const setEndDate = useUserStore((state) => state.setEndDate);
  const setAccount = useUserStore((state) => state.setAccount);

  const { data: accounts, loading: accountLoading } = useGetAllAccount();
  const accountFiltered = accounts?.filter((item) => item.is_posting == true);
  const accountOptions = useMapInputOptions(accountFiltered);

  const methods = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = async (state) => {
    console.log(state);

    setStartDate(state.start_date);
    setEndDate(state.end_date);
    setAccount(state.account);
  };

  const onClear = () => {
    methods.reset();
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter">
      <Form {...methods} onSubmit={onSubmit}>
        <Label>Tgl. transaksi</Label>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <DatePicker
            id="start_date"
            name="start_date"
            defaultDate={startDate ?? new Date()}
          />
          <DatePicker
            id="end_date"
            name="end_date"
            defaultDate={endDate ?? new Date()}
          />
        </div>

        <Skeleton isLoading={accountLoading}>
          <Select
            label="Akun"
            name="account"
            placeholder="--- Pilih Akun ---"
            options={accountOptions}
            defaultValue={account}
          />
        </Skeleton>

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
