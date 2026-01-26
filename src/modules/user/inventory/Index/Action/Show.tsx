import { Modal } from "@components/ui/modal";

interface Props {
  id: string;
  name: string;
  onOpen: boolean;
  onClose: () => void;
}

export default function UsageShow({ name, onOpen, onClose }: Props) {
  return (
    <Modal isOpen={onOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="relative w-full max-w-[600px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
        <div className="text-center">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
            {name}
          </h4>
        </div>
      </div>
    </Modal>
  );
}
