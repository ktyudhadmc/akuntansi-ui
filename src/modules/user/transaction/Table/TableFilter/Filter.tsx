import { MdOutlineRefresh } from "react-icons/md";
import { useForm, type SubmitHandler } from "react-hook-form";

import useUserStore from "@store/useUserStore";
import { todayYMString } from "@helpers/index";

import Form from "@components/form/Form";
import Drawer from "@components/ui/drawer";
import Button from "@components/ui/button/Button";
import Input from "@components/form/input/InputField";

import Select from "@components/form/Select";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export default function Filter({ onClose, onOpen }: Props) {
  const statusOptions = [
    { label: "Belum Dibayar", value: "unpaid" },
    { label: "Selesai", value: "completed" },
    { label: "Lunas", value: "paid" },
    { label: "Terbayar Sebagian", value: "partially-paid" },
    { label: "Lewat Jatuh Tempo", value: "overdue" },
    { label: "Tidak Digunakan", value: "unused" },
    { label: "Tertunda", value: "pending" },
    { label: "Disetujui", value: "approved" },
    { label: "Ditolak", value: "rejected" },
    { label: "Draf", value: "draft" },
    { label: "Batal", value: "void" },
    { label: "Terkirim Sebagian", value: "partially-sent" },
    { label: "Dibatalkan", value: "canceled" },
    {
      label: "Dibatalkan & dikirim sebagian",
      value: "canceled-partially-delivered",
    },
  ];

  const typeOptions = [
    { label: "Faktur Penjualan", value: "sales-invoice" },
    { label: "Penerimaan Pembayaran", value: "payment-receipt" },
    { label: "Pemesanan Penjualan", value: "sales-order" },
    { label: "Biaya", value: "expense" },
    { label: "Terima Uang", value: "receive-money" },
    { label: "Transfer Bank", value: "bank-transfer" },
    { label: "Kirim Uang", value: "send-money" },
    { label: "Jurnal Umum", value: "journal-entry" },
    { label: "Faktur Pembelian", value: "purchase-invoice" },
    { label: "Pembayaran Pembelian", value: "purchase-payment" },
    { label: "Pembayaran Pemesanan Penjualan", value: "sales-order-payment" },
    { label: "Pengembalian", value: "return" },
    { label: "Kredit Memo", value: "credit-memo" },
    { label: "Pembayaran Catatan Hutang", value: "bill-payment" },
    { label: "Pengembalian Kredit Memo", value: "credit-memo-refund" },
    { label: "Pemesanan Pembelian", value: "purchase-order" },
    {
      label: "Pembayaran Pemesanan Pembelian",
      value: "purchase-order-payment",
    },
    { label: "Pengembalian", value: "purchase-return" },
    { label: "Penawaran Pembelian", value: "purchase-quote" },
    { label: "Penawaran Penjualan", value: "sales-quote" },
    { label: "Transfer Gudang", value: "inventory-transfer" },
    { label: "Saldo Awal", value: "opening-balance" },
    { label: "Debit Memo", value: "debit-memo" },
    { label: "Biaya Kedatangan", value: "landed-cost" },
  ];

  const transactionDate = useUserStore((state) => state.transactionDate);
  const transactionType = useUserStore((state) => state.transactionType);
  const transactionStatus = useUserStore((state) => state.transactionStatus);

  const setTransactionDate = useUserStore((state) => state.setTransactionDate);
  const setTransactionType = useUserStore((state) => state.setTransactionType);
  const setTransactionStatus = useUserStore(
    (state) => state.setTransactionStatus,
  );
  const resetTransactionFilter = useUserStore(
    (state) => state.resetTransactionFilter,
  );

  const methods = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = async (state) => {
    setTransactionDate(state.date);
    setTransactionType(state.type);
    setTransactionStatus(state.status);

    onClose();
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
      type: null,
      status: null,
    });

    resetTransactionFilter();
  };

  return (
    <Drawer onOpen={onOpen} onClose={onClose} label="Filter">
      <Form {...methods} onSubmit={onSubmit}>
        <Input
          label="Tanggal"
          type="month"
          name="date"
          defaultValue={transactionDate}
        />

        <Select
          label="Tipe transaksi"
          placeholder="Semua"
          name="type"
          options={typeOptions}
          defaultValue={transactionType}
        />

        <Select
          label="Status Pembayaran"
          placeholder="Semua"
          name="status"
          options={statusOptions}
          defaultValue={transactionStatus}
        />

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
