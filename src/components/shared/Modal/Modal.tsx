import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalContentProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalContent = ({ onClose, children }: ModalContentProps) => {
  return (
    <>
      <div
        className="h-screen w-screen bg-black opacity-50 block fixed z-11"
        onClick={onClose}
      ></div>
      <dialog className="block fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl z-12">
        {children}
      </dialog>
    </>
  );
};

export interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  children: ReactNode;
}

export const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
  return (
    <>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)}>
            {children}
          </ModalContent>,
          document.body,
        )}
    </>
  );
};
