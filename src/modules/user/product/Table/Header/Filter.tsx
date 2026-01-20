import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import Label from "@components/form/Label";
import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Checkbox from "@components/form/input/Checkbox";
import Button from "@components/ui/button/Button";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export default function Filter({ onClose, onOpen }: Props) {
  const methods = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = async (state) => {
    console.log(state);
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter Material">
      <Form {...methods} onSubmit={onSubmit}>
        {/* category */}
        <Label>Tgl. transaksi</Label>
        <Checkbox
          label="MEKANIK DAN SPARE PART"
          name="category_id"
          value="mekanik_spare_part"
        />
        <Checkbox label="IT" name="category_id" value="it" />
        <Checkbox
          label="ASSET, INVENTARIS"
          name="category_id"
          value="asset_inventaris"
        />

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
