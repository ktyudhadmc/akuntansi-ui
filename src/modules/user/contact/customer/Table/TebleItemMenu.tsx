import Button from "@components/ui/button/Button";
import { useModal } from "@hooks/useModal";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DeleteContact from "../Action/Delete";

interface Props {
  id: number;
  code: string;
  name: string;
}

export default function TableItemMenu({ id, code, name }: Props) {
  const navigate = useNavigate();

  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <DeleteContact
        id={id}
        code={code}
        name={name}
        key={`modal-delete-${name}`}
        onOpen={isOpen}
        onClose={closeModal}
      />
      <div className="flex gap-2 justify-end">
        {/* edit */}
        <Button
          onClick={() => navigate(`${id}/edit?tab=customer`)}
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
