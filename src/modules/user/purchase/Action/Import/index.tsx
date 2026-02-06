import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { ExcelIcon } from "@assets/icons";
import Label from "@components/form/Label";
import AvatarText from "@components/ui/avatar/AvatarText";
import Button from "@components/ui/button/Button";
import Spinner from "@components/Reusable/Spinner";
import Form from "@components/form/Form";
import ImportDropZone from "@components/form/file/DropZone";

import useFileUpload from "@hooks/useFileUpload";
import type { IImportPurchasePayload } from "@services/user/purchase/interfaces/request.type";
import useImport from "@services/user/purchase/hooks/useImport";
import { toast } from "react-toastify";
import config from "@constants/config";

type FormFields = IImportPurchasePayload;

export default function ImportAccount() {
  const navigate = useNavigate();

  /** hooks upload file */
  const { file, getRootProps, getInputProps, onRemove, isDragActive, open } =
    useFileUpload({
      acceptTypes: ["csv", "excel"],
    });

  /** download template */
  const handleDownload = () => {
    window.open(config.TEMPLATE_IMPORT_PURCHASE, "_blank");
  };

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid && file?.file;

  const { importData } = useImport();

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
        navigate(-1);
        toast.success("Berhasil mengimpor data!");
      }
    }
  };

  return (
    <div>
      {/* download template */}
      <div className="flex gap-4 my-4">
        <div className="w-fit">
          <AvatarText text="1" size="10" />
        </div>
        <div className="my-auto cursor-pointer" onClick={handleDownload}>
          <Label className="dark:text-white">Download CSV template</Label>
          <p className="text-theme-xs dark:text-gray-400 mb-2 max-w-2xl">
            File ini memiliki kolom header sesuai dengan yang diperlukan Jurnal
            untuk mengimpor data Anda dengan benar
          </p>

          <Button size="xs" className="md:w-auto w-full">
            <ExcelIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            Download template
          </Button>
        </div>
      </div>

      {/* insert data */}
      <div className="flex gap-4 mb-4">
        <div className="w-fit">
          <AvatarText text="2" size="10" />
        </div>
        <div className="my-auto">
          <Label className="dark:text-white">Copy/Insert data Anda</Label>
          <p className="text-theme-xs dark:text-gray-400 mb-2 max-w-2xl">
            Gunakan CSV atau aplikasi Spreadsheet lainnya untuk men-copy dan
            paste data Anda. Pastikan bahwa data yang Anda input sesuai dengan
            kolom header yang disediakan di dalam template.
          </p>

          <h6 className="uppercase text-red-500 text-xs font-medium">
            Penting!
          </h6>
          <ol className="list-disc text-theme-xs dark:text-gray-400">
            <li>Format Tanggal: dd/mm/yyyy (English - Canada)</li>
            <li>Maksimum baris transaksi adalah 1000 entry (optimal)</li>
            <li>
              <b>TIDAK</b> perlu pemisah untuk nominal ribuan seperti koma (,)
              atau titik (.)
            </li>
            <li>Gunakan titik (.) sebagai pemisah desimal</li>
            <li>
              <b>TIDAK</b> perlu memasukkan simbol mata uang (Rp, $, dll)
            </li>
            <li>
              <b>JANGAN</b> ubah format kolom yang disediakan
            </li>
          </ol>

          <div className="bg-green-100 p-2 rounded-lg mt-4">
            <span className="text-theme-xs font-semibold text-green-900">
              Tips
            </span>
            <p className="text-theme-xs max-w-2xl">
              Jika menggunakan Microsoft Excel, gunakan tanda (') didepan pada
              setiap pengisian data yang menggunakan angka
              <br />
              Contoh : '6-6003, '11-02-2026
            </p>
          </div>
        </div>
      </div>

      {/* upload csv */}

      <Form {...methods} onSubmit={onSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="w-fit">
            <AvatarText text="2" size="10" />
          </div>
          <div>
            <Label>
              Upload CSV template
              <span className="text-error-500 ml-1">*</span>
            </Label>
            <p className="text-theme-xs max-w-2xl mb-4">
              Setelah selesai mengubah, silahkan upload file. File yang akan
              Anda upload harus dalam format <i>Comma Separated Values</i>{" "}
              (CSV). File anda harus diaktifkan dengan ekstensi .csv, .xlsx atau
              .xls
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
            onClick={() => navigate(-1)}
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
