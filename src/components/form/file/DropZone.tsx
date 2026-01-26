import { MdUploadFile, MdNearMe } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { type FileState } from "@hooks/useFileUpload";
import { useEffect, useState } from "react";
import Button from "@components/ui/button/Button";

interface Props {
  file: FileState | null;
  defaultFile?: string;
  getRootProps: any;
  getInputProps: any;
  isDragActive: any;
  onOpen: VoidFunction;
  onRemove: VoidFunction;
  readOnly?: boolean;
}

export default function ImportDropZone({
  file,
  defaultFile,
  getInputProps,
  getRootProps,
  isDragActive,
  onOpen,
  onRemove,
  readOnly = false,
}: Props) {
  const [fileState, setFileState] = useState(defaultFile);

  useEffect(() => {
    if (fileState) {
      setFileState(fileState);
    }
  }, [defaultFile, fileState]);

  const onHandleGetRootProps = () => {
    if (!readOnly) {
      return { ...getRootProps() };
    }

    return false;
  };

  const onRemoveFile = () => {
    setFileState("");
    onRemove();
  };

  return (
    <>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...onHandleGetRootProps()}
          className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
        ${readOnly ? "cursor-not-allowed opacity-60" : ""}
      `}
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0!">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <MdUploadFile className="text-3xl" />
              </div>
            </div>

            {/* Text Content */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-md dark:text-white/90">
              {file
                ? file.name
                : isDragActive
                  ? "Drop Files Here"
                  : "Seret & Lepaskan file di sini"}
            </h4>

            {!file && (
              <span className=" text-center block w-full max-w-[290px] text-xs text-gray-700 dark:text-gray-400">
                Seret dan lepaskan file (.csv, .xlsx, .xls), atau telusuri.
              </span>
            )}
          </div>
        </div>

        {/* REMOVE BUTTON */}
        <div className="flex m-4 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            disabled={readOnly || !file}
            onClick={() => !readOnly && onRemoveFile()}
          >
            <HiTrash />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            disabled={readOnly}
            onClick={() => !readOnly && onOpen()}
          >
            <MdNearMe />
          </Button>
        </div>
      </div>
    </>
  );
}
