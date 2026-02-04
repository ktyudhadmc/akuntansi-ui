import DatePicker from "@components/form/default/DatePicker";
import { formatDateAsYMD } from "@helpers/index";
import useUserStore from "@store/useUserStore";

export default function TableHeader() {
  const startDate = useUserStore((state) => state.startDate);
  const endDate = useUserStore((state) => state.endDate);

  const setStartDate = useUserStore((state) => state.setStartDate);
  const setEndDate = useUserStore((state) => state.setEndDate);

  const today = new Date();
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex gap-2">
          <div className="w-full">
            <DatePicker
              label="Tgl. mulai"
              id="start_date"
              name="start_date"
              mode="single"
              maxDate={endDate ?? today}
              defaultDate={startDate ?? today}
              onChange={(e) => setStartDate(formatDateAsYMD(e[0]))}
            />
          </div>

          <div className="w-full">
            <DatePicker
              label="Tgl. selesai"
              id="end_date"
              name="end_date"
              mode="single"
              minDate={startDate ?? today}
              disabled={!startDate}
              defaultDate={endDate ?? today}
              onChange={(e) => setEndDate(formatDateAsYMD(e[0]))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
