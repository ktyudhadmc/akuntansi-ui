import Button from "@components/ui/button/Button";
import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  name: string;
}

export default function TableItemMenu({ id, name }: Props) {
  const { openModal } = useModal();
  const navigate = useNavigate();

  return (
    <>
      <DeleteAccount id={id} name={name} />
      <div className="flex gap-2">
        <Button
          onClick={() => navigate(`${id}/edit`)}
          className="cursor-pointer px-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          <HiPencil />
        </Button>
        <Button
          onClick={openModal}
          className="cursor-pointer px-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          <HiTrash />
        </Button>
      </div>
    </>
  );
}
