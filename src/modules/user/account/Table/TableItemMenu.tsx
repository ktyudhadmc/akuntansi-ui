import Button from "@components/ui/button/Button";
import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  code: string;
  name: string;
}

export default function TableItemMenu({ id, code, name }: Props) {
  const { openModal, isOpen, closeModal } = useModal();

  const navigate = useNavigate();

  return (
    <>
      <DeleteAccount
        id={id}
        code={code}
        name={name}
        key={`modal-delete-${name}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="flex gap-2">
        <Button
          onClick={() => navigate(`${id}/edit`)}
          size="sm"
          variant="outline"
        >
          <HiPencil />
        </Button>
        <Button onClick={openModal} size="sm" variant="outline">
          <HiTrash />
        </Button>
      </div>
    </>
  );
}
