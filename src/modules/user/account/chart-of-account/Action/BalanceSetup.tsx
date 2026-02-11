import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { formatDateAsYMD, todayYMDString } from "@helpers/date";

import DatePicker from "@components/form/default/DatePicker";
import Button from "@components/ui/button/Button";

export default function COABalanceSetup() {
  const navigate = useNavigate();

  const [conversionDate, setConversionDate] = useState<string>(todayYMDString);
  const [subConversionDate, setSubConversionDate] = useState<string>();

  const onSubmit = async () => {
    alert(subConversionDate);
  };

  useEffect(() => {
    setSubConversionDate(
      dayjs(conversionDate).subtract(1, "day").format("YYYY-MM-DD"),
    );
  }, [conversionDate]);

  return (
    <div className="lg:max-w-md mx-auto">
      <div className="mb-6">
        <h5 className="font-semibold text-lg mb-2 dark:text-white">
          Pilih Tanggal Konversi
        </h5>
        <DatePicker
          label="Tanggal konversi"
          id="conversion_date"
          name="conversion_date"
          defaultDate={conversionDate}
          onChange={(e) => setConversionDate(formatDateAsYMD(e[0]))}
          required
        />

        <small>
          Saldo awal Anda terhitung mulai
          <span className="ml-1">{subConversionDate}</span>
        </small>
      </div>
      <div className="mb-6">
        <h5 className="font-semibold text-lg mb-2 dark:text-white">
          Perlu diketahui
        </h5>
        <div className="flex gap-4 mb-4">
          <AiOutlineCheckCircle className="text-green-500" size={32} />
          <p className="text-gray-500 dark:text-gray-400 text-theme-sm max-w-sm">
            Anda dapat mengubah tanggal konversi selama belum melakukan tutup
            buku.
          </p>
        </div>
        <div className="flex gap-4">
          <AiOutlineCheckCircle className="text-green-500" size={32} />
          <p className="text-gray-500 dark:text-gray-400 text-theme-sm max-w-sm">
            Anda bisa input transaksi sebelum tanggal konversi dengan batasan
            300.000 akun transaksi. Transaksi yang diinput tidak akan
            memengaruhi saldo saat ini.
          </p>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <Button
          type="button"
          onClick={() => navigate(-1)}
          className="uppercase w-full"
          size="sm"
          variant="outline"
        >
          Batal
        </Button>
        <Button
          type="button"
          className=" uppercase w-full"
          size="sm"
          disabled={!conversionDate}
          onClick={onSubmit}
        >
          Kirim
        </Button>
      </div>
    </div>
  );
}
