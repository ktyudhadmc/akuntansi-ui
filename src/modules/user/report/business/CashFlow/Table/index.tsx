import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import { todayYMDString } from "@helpers/date";
import TableAction from "./TableAction";
import TableItem from "./TableItem";

export type CashFlow = {
  parent: string;
  amount: number;
  child: CashflowItem[];
};

export type CashflowItem = {
  name: string;
  amount: number;
};

export default function RBCashFlow() {
  const data: CashFlow[] = [
    {
      parent: "Arus Kas dari Aktivitas Operasional",
      amount: 100000,
      child: [
        { name: "Pelunasan Piutang Usaha", amount: 25000 },
        { name: "Pelunasan Piutang Usaha", amount: 25000 },
        { name: "Pelunasan Hutang Usaha", amount: 25000 },
        { name: "Pembelian Tunai", amount: 25000 },
        // {
        //   name: "Arus Kas Masuk",
        //   transactions: [],
        // },
        // {
        //   name: "Arus Kas Keluar",
        //   transactions: [],
        // },
      ],
    },
    {
      parent: "Arus Kas dari Aktivitas Investasi",
      amount: 50000,
      child: [
        { name: "Perolehan Aset Tetap", amount: 25000 },
        { name: "Penambahan Properti Investasi", amount: 25000 },
      ],
    },
    {
      parent: "Arus Kas dari Aktivitas Pembiayaan",
      amount: 50000,
      child: [
        { name: "Hutang Bank", amount: 25000 },
        { name: "Hutang Instansi Non Bank", amount: 25000 },
      ],
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <TableAction />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader className="text-start">
                    Nama Akun & Kategori
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    <span className="mr-8"> Tanggal </span>
                    {todayYMDString}
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => {
                  return (
                    <TableItem
                      key={`cashflow-table-item-${index}`}
                      item={item}
                    />
                  );
                })}
              </TableBody>

              <TableFoot>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="!text-sm !text-black dark:!text-white font-medium"
                  >
                    <div className="py-3"></div>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="!text-sm !text-black dark:!text-white font-medium">
                    Kenaikan (Penurunan) Kas
                  </TableCell>
                  <TableCell className="!text-sm !text-black dark:!text-white text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell className="!text-sm !text-black dark:!text-white font-medium">
                    Total revaluasi bank
                  </TableCell>
                  <TableCell className="!text-sm !text-black dark:!text-white text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell className="!text-sm !text-black dark:!text-white font-medium">
                    Saldo kas awal
                  </TableCell>
                  <TableCell className="!text-sm !text-black dark:!text-white text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="!text-sm !text-black dark:!text-white font-medium">
                    Saldo kas akhir
                  </TableCell>
                  <TableCell className="!text-sm !text-black dark:!text-white text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                </TableRow>
              </TableFoot>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
