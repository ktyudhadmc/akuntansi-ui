import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

import { useEffect } from "react";

interface Props {
  onOpen: boolean;
  onClose: () => void;
  reference: HTMLElement | null;
  children: React.ReactNode;
}

export default function PopOver({
  onOpen,
  onClose,
  reference,
  children,
}: Props) {
  const { refs, floatingStyles, update } = useFloating({
    middleware: [offset(16), flip(), shift({ padding: 20 })],
  });

  // pasang anchor
  useEffect(() => {
    if (reference) refs.setReference(reference);
  }, [reference]);

  // auto reposition saat scroll / resize
  useEffect(() => {
    if (!reference || !onOpen) return;

    return autoUpdate(reference, refs.floating.current!, update);
  }, [onOpen, reference]);

  if (!onOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100001]" onClick={onClose} />

      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={`absolute z-[100001] bg-white border border-gray-200 rounded-lg dark:bg-[#1E2634] dark:border-gray-700 ${onOpen ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </>
  );
}
