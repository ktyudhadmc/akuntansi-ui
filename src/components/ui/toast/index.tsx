import { toast } from "react-toastify";

const toastContent = (title: string, description?: string) => (
  <div>
    <p className="font-semibold text-sm text-black">{title}</p>
    {description && (
      <p className="text-xs opacity-70 mt-0.5 text-black">{description}</p>
    )}
  </div>
);

export const toastInfo = (title: string, description?: string) => {
  toast.info(toastContent(title, description));
};

export const toastSuccess = (title: string, description?: string) => {
  toast.success(toastContent(title, description));
};

export const toastWarning = (title: string, description?: string) => {
  toast.warning(toastContent(title, description));
};

export const toastError = (title: string, description?: string) => {
  toast.error(toastContent(title, description));
};
