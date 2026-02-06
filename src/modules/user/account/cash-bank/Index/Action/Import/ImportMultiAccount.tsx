import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import config from "@constants/config";
import useGoBack from "@hooks/useGoBack";

import { ExcelIcon } from "@assets/icons";
import Label from "@components/form/Label";
import Button from "@components/ui/button/Button";
import Spinner from "@components/Reusable/Spinner";
import Form from "@components/form/Form";
import ImportDropZone from "@components/form/file/DropZone";

import useFileUpload from "@hooks/useFileUpload";
import type { IImportBankStatementPayload } from "@services/user/account/cash-bank/interfaces/request.type";
import useImportBankStatement from "@services/user/account/cash-bank/hooks/useImportBankStatement";

type FormFields = IImportBankStatementPayload;

export default function CBImportMultiAccount() {
  const goBack = useGoBack();

  /** hooks upload file */
  const { file, getRootProps, getInputProps, onRemove, isDragActive, open } =
    useFileUpload({
      acceptTypes: ["csv", "excel"],
    });

  /** download template */
  const handleDownload = () => {
    window.open(config.TEMPLATE_IMPORT_CASH_BANK, "_blank");
  };

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid && file?.file;

  const { importData } = useImportBankStatement();

  const onSubmit: SubmitHandler<FormFields> = async () => {
    /** tidak boleh input ketika file kosong */
    if (!file?.file) return;

    const { error, response } = await importData({ file: file?.file });
    if (error || response) {
      if (error) {
        toast.error(
          <div>
            <strong>Gagal mengimpor data</strong>
            <p>Pastikan file sesuai dengan template yang disediakan!</p>
          </div>,
        );
      } else {
        methods.reset();
        goBack();
        toast.success("Berhasil mengimpor data!");
      }
    }
  };

  return (
    <div>
      {/* upload csv */}
      <Form {...methods} onSubmit={onSubmit}>
        <div>
          <div className="max-w-2xl">
            <div className="mb-4">
              <Label>1. Download file template rekening koran kami</Label>
              <p className="text-theme-xs italic text-gray-500 dark:text-gray-400 mb-2">
                Mulai dengan men-download template file CSV/XLSX/XLS rekening
                koran kami. File ini memiliki kolom heading sesuai yang Jurnal
                perlu untuk meng-impor data rekening koran Anda.
              </p>
              <div
                className="flex gap-2 text-success-800 text-theme-xs font-normal cursor-pointer"
                onClick={handleDownload}
              >
                <ExcelIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-8" />
                <span className="my-auto"> Download File Template</span>
              </div>
            </div>

            <div className="mb-4">
              <Label>2. Copy data rekening koran Anda kedalam template</Label>
              <p className="text-theme-xs italic text-gray-500 dark:text-gray-400 mb-2">
                Ekspor data rekening koran Anda dari sistem yang lama sebagai
                CSV/XLSX/XLS. Menggunakan Excel atau editor spreadsheet lainnya,
                copy dan paste data rekening koran Anda dari file yg di ekspor
                kedalam template. Pastikan bahwa data rekening koran Anda sesuai
                dengan heading kolom yg di sediakan dalam template.
              </p>
              <div className="md:mx-8 mx-4">
                <h6 className="uppercase text-red-500 text-xs font-medium">
                  Penting!
                </h6>
                <ol className="list-disc text-theme-xs dark:text-gray-400">
                  <li>Format Tanggal: dd/mm/yyyy (English - Canada)</li>
                  <li>Maksimum baris transaksi adalah 1000 entry (optimal)</li>
                  <li>
                    <b>TIDAK</b> perlu pemisah untuk nominal ribuan seperti koma
                    (,) atau titik (.)
                  </li>
                  <li>Gunakan titik (.) sebagai pemisah desimal</li>
                  <li>
                    <b>TIDAK</b> perlu memasukkan simbol mata uang (Rp, $, dll)
                  </li>
                  <li>
                    <b>JANGAN</b> ubah format kolom yang disediakan
                  </li>
                </ol>
              </div>
            </div>

            <Label>
              3. Upload CSV/XLSX/XLS template
              <span className="text-error-500 ml-1">*</span>
            </Label>
            <p className="text-theme-xs max-w-2xl mb-4">
              Setelah selesai mengubah, silahkan upload file. File yang akan
              Anda upload harus dalam format (CSV/XLSX/XLS). File anda harus
              diaktifkan dengan ekstensi .csv, .xlsx atau .xls
            </p>

            <ImportDropZone
              file={file}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              onRemove={onRemove}
              onOpen={open}
              isDragActive={isDragActive}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            onClick={goBack}
            className="uppercase"
            size="sm"
            variant="outline"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className=" uppercase"
            size="sm"
            disabled={!isValid || isSubmitting}
          >
            {!isSubmitting ? "Kirim" : <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
