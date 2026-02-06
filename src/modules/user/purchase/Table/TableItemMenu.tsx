import Button from "@components/ui/button/Button";
// import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil, HiEye } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

import DeleteProduct from "../Action/Delete";

interface Props {
  id: string;
  name: string;
}

export default function TableItemMenu({ id, name }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <DeleteProduct
        id={id}
        name={name}
        key={`modal-delete-${name}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="flex gap-2 justify-end">
        {/* show */}
        <Button onClick={() => navigate(`${id}`)} size="xs" variant="outline">
          <HiEye />
        </Button>

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
