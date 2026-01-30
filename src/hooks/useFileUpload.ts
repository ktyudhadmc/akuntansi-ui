import type { FileAcceptKey } from "@def/fieleUploadAccept";
import { mergeFileUploadAccept } from "@helpers/merge-file-upload-accept";
import { useCallback, useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

interface UseFileUploadProps extends DropzoneOptions {
  acceptTypes?: FileAcceptKey[];
}
export interface FileState {
  preview: string;
  file: any;
  name: string;
}

export default function useFileUpload(param?: UseFileUploadProps) {
  const [file, setFile] = useState<FileState | null>(null);
  const [error, setError] = useState("");

  useEffect(
    () => () => URL.revokeObjectURL(file?.preview as string),
    [file?.preview],
  );

  const onRemove = useCallback(() => {
    setFile(null);
    URL.revokeObjectURL(file?.preview as string);
  }, [file?.preview]);

  /** file accept */
  const accept = param?.acceptTypes
    ? mergeFileUploadAccept(param.acceptTypes)
    : param?.accept;

  const { acceptTypes, ...dropzoneOptions } = param || {};

  const { getInputProps, getRootProps, isDragActive, open, ...dropzoneVars } =
    useDropzone({
      maxFiles: 1,
      noClick: true,
      accept,
      onDrop: (acceptedFile: any) => {
        setFile({
          preview: URL.createObjectURL(acceptedFile[0]),
          file: acceptedFile[0],
          name: acceptedFile[0].name,
        });
      },
      onError: (err) => setError(err.message),
      ...dropzoneOptions,
    });

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
    file,
    error,
    onRemove,
    dropzoneVars,
  };
}
