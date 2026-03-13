import Label from "@components/form/Label";
import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";
import type { Customer } from "@services/user/customer/interfaces/response.type";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DeleteContact from "./Delete";
import { useModal } from "@hooks/useModal";

interface Props {
  item: Customer;
  onOpen: boolean;
  onClose: () => void;
}

export default function ShowCustomer({ onOpen, onClose, item }: Props) {
  const navigate = useNavigate();

  const { openModal, isOpen, closeModal } = useModal();
  return (
    <>
      <DeleteContact
        id={Number(item.id)}
        code={item.code}
        name={item.name}
        key={`modal-delete-${item.id}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <Modal
        isOpen={onOpen}
        onClose={onClose}
        className="max-w-[700px] m-4 text-start"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Supplier
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Detail informasi dari data supplier.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Kode</Label>
                  <p>{item.code}</p>
                </div>

                <div>
                  <Label>Nama</Label>
                  <p>{item.name}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    onClose();
                    navigate(`${item.id}/edit?tab=customer`);
                  }}
                >
                  <HiOutlinePencil />
                </Button>

                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    onClose();
                    openModal();
                  }}
                >
                  <HiOutlineTrash />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
