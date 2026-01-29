import Button from "@components/ui/button/Button";
import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  code: string;
  name: string;
  isLock: boolean;
}

export default function TableItemMenu({ id, code, name, isLock }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();

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
        {/* edit */}
        <Button
          onClick={() => navigate(`${id}/edit`)}
          size="xs"
          variant="outline"
        >
          <HiPencil />
        </Button>

        {/* delete */}
        {!isLock && (
          <Button onClick={openModal} size="xs" variant="outline">
            <HiTrash />
          </Button>
        )}
      </div>
    </>
  );
}
