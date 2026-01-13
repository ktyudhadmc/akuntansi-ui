import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";
import { useModal } from "@hooks/useModal";
import useDelete from "@services/user/account/hooks/useDelete";
import { toast } from "react-toastify";

interface Props {
  id: number;
  name: string;
}

export default function DeleteAccount({ id, name }: Props) {
  const { isOpen, closeModal } = useModal();
  const { deleteData } = useDelete();

  const onDelete = async () => {
    const { error, response } = await deleteData(id);
    if (error || response) {
      if (error) {
        toast.error("Gagal menghapus data!");
      } else {
        closeModal();
        toast.success("Berhasil menghapus data!");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-sm m-4">
      <div className="no-scrollbar relative w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Hapus
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Apakah Anda yakin menghapus <b>{name}</b>?
          </p>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" className="w-full" onClick={closeModal}>
              Tidak
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={onDelete}
            >
              Ya
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
