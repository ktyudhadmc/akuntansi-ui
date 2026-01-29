import DatePicker from "@components/form/default/DatePicker";

interface Props {
  setStartDate: (param: Date[]) => void;
  setEndDate: (param: Date[]) => void;
}

export default function TableHeader({ setStartDate, setEndDate }: Props) {
  return (
    <>
      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex lg:flex-row flex-col gap-4">
          <DatePicker
            label="Tgl. mulai"
            id="start_date"
            name="start_date"
            defaultDate={new Date()}
            onChange={(e) => setStartDate(e)}
          />

          <DatePicker
            label="Tgl. selesai"
            id="end_date"
            name="end_date"
            defaultDate={new Date()}
            onChange={(e) => setEndDate(e)}
          />
        </div>
      </div>
    </>
  );
}
