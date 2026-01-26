import Button from "@components/ui/button/Button";
import { HiEye } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import UsageShow from "../Action/Show";

interface Props {
  id: string;
  name: string;
}

export default function TableItemMenu({ id, name }: Props) {
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <UsageShow onOpen={isOpen} onClose={closeModal} id={id} name={name} />
      <div className="flex gap-2">
        {/* delete */}
        <Button onClick={openModal} size="xs" variant="outline">
          <HiEye />
        </Button>
      </div>
    </>
  );
}
