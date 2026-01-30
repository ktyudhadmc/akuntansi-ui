import { type FileAcceptKey, FILE_ACCEPT } from "@def/fieleUploadAccept";

export const mergeFileUploadAccept = (types: FileAcceptKey[]) => {
  return types.reduce<Record<string, string[]>>((acc, type) => {
    Object.entries(FILE_ACCEPT[type]).forEach(([mime, ext]) => {
      acc[mime] = [...(acc[mime] || []), ...ext];
    });
    return acc;
  }, {});
};
