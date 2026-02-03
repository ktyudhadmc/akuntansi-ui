import { useNavigate } from "react-router-dom";
import { HiTrash, HiPencil } from "react-icons/hi";

import { useModal } from "@hooks/useModal";

import Button from "@components/ui/button/Button";
import TaxDelete from "../Action/Delete";

interface Props {
  id: string;
  name: string;
}

export default function TableItemMenu({ id, name }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <TaxDelete
        id={id}
        name={name}
        key={`modal-delete-${name}`}
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
