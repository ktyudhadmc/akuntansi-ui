import Button from "@components/ui/button/Button";
import { useModal } from "@hooks/useModal";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteContact from "../Action/Delete";
import { navigateKeepHash } from "@helpers/index";

interface Props {
  id: number;
  code: string;
  name: string;
}

export default function TableItemMenu({ id, code, name }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  
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
      <div className="flex gap-2">
        {/* edit */}
        <Button
          onClick={() => navigateKeepHash(navigate, location, `${id}/edit`)}
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
