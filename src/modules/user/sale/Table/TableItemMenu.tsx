import Button from "@components/ui/button/Button";
// import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

import DeleteProduct from "../Action/Delete";

interface Props {
  id: string;
  invoice: string;
}

export default function TableItemMenu({ id, invoice }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <DeleteProduct
        id={id}
        invoice={invoice}
        key={`modal-delete-${id}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="flex gap-2">
        {/* edit */}
        <Button
          onClick={() => navigate(`${id}/edit`)}
          size="xs"
          variant="outline"
        >
          <HiPencil />
        </Button>

        {/* delete */}
        <Button onClick={openModal} size="xs" variant="outline">
          <HiTrash />
        </Button>
      </div>
    </>
  );
}
