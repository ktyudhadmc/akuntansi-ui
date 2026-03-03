import axiosInstance from "@/lib/axios-instance";
import { useState, useCallback } from "react";

type DownloadParams = {
  url: string;
  filename?: string;
  tokenType?: "admin" | "company" | "user";
  mode: "view" | "download";
  type?: "pdf" | "xlsx" | "csv";
};

type DownloadState = {
  loading: boolean;
  progress: number;
  error: unknown;
};

const extractFilename = (
  contentDisposition: string | undefined,
  fallback: string,
): string => {
  if (!contentDisposition) return fallback;

  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''([^;\n]+)/i);
  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1].trim());
  }

  const plainMatch = contentDisposition.match(
    /filename=["']?([^"';\n]+)["']?/i,
  );
  if (plainMatch?.[1]) {
    return plainMatch[1].trim();
  }

  return fallback;
};

export default function useDownload() {
  const [state, setState] = useState<DownloadState>({
    loading: false,
    progress: 0,
    error: null,
  });

  const trigger = useCallback(
    async ({
      url,
      filename = "download",
      tokenType = "user",
      mode,
      type,
    }: DownloadParams): Promise<void> => {
      try {
        setState({ loading: true, progress: 0, error: null });

        const response = await axiosInstance({
          withCompany: true,
          withToken: true,
          tokenType,
        }).get(url, {
          params: { mode, type },
          responseType: "blob",
          onDownloadProgress: (event) => {
            const progress = event.total
              ? Math.round((event.loaded / event.total) * 100)
              : -1;

            setState((prev) => ({
              ...prev,
              progress: progress === -1 ? 0 : progress,
            }));
          },
        });

        const contentType = response.headers["content-type"] as
          | string
          | undefined;
        const contentDisposition = response.headers["content-disposition"] as
          | string
          | undefined;
        const finalFilename = extractFilename(contentDisposition, filename);

        const blob = new Blob([response.data], {
          type: contentType ?? "application/octet-stream",
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", finalFilename);

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(downloadUrl);
      } catch (error: any) {
        const message =
          error?.response?.data?.message ?? "Gagal mengunduh file";
        setState((prev) => ({ ...prev, error: message }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [],
  );

  return { ...state, trigger };
}
