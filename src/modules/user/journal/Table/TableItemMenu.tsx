import { HiTrash, HiPencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { useModal } from "@hooks/useModal";

import Button from "@components/ui/button/Button";
import GeneralJournalDelete from "../Action/Delete";

interface Props {
  id: number;
  name: string;
}

export default function TableItemMenu({ id, name }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <GeneralJournalDelete
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
