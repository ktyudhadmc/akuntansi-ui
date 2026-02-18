import Alert from "@components/ui/alert";

interface Props {
  isLoading?: boolean;
  isLocked: boolean;
  isClosed: boolean;
}
export default function AlertPeriod({ isLoading, isLocked, isClosed }: Props) {
  if (isLoading) return;
  return (
    <>
      {isLocked ||
        (isClosed && (
          <Alert
            variant="danger"
            title="Periode terkunci!"
            message={"Periode telah dikunci. Perubahan tidak diizinkan."}
            className="mb-6"
          />
        ))}
    </>
  );
}
