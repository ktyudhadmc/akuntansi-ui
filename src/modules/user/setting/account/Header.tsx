import Button from "@components/ui/button/Button";
import { HiPlus } from "react-icons/hi";

import { useModal } from "@hooks/useModal";

import SettingAccountClose from "./Action/Close";
import SettingAccountOpen from "./Action/Open";

export default function Header() {
  const { openModal, isOpen, closeModal } = useModal();
  const {
    openModal: showOpenPeriodModal,
    isOpen: openPeriodModal,
    closeModal: hideOpenPeriodModal,
  } = useModal();
  return (
    <>
      <SettingAccountClose onOpen={isOpen} onClose={closeModal} />
      <SettingAccountOpen
        onOpen={openPeriodModal}
        onClose={hideOpenPeriodModal}
      />

      <div className="flex lg:flex-row flex-col lg:justify-between gap-2">
        <div className="flex lg:flex-row flex-col gap-2">
          <Button size="sm" variant="primary" onClick={openModal}>
            <HiPlus />
            Tutup periode
          </Button>
          <Button size="sm" variant="primary" onClick={showOpenPeriodModal}>
            <HiPlus />
            Buka periode
          </Button>
        </div>
      </div>
    </>
  );
}
