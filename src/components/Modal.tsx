import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    showModal: boolean;
    children: ReactNode;
    onClose?: () => void;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    showModal,
    children,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
}) => {
    useEffect(() => {
        if (!showModal) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === "Escape" &&
                closeOnEscape &&
                onClose
            ) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal, closeOnEscape, onClose]);

    if (!showModal) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => {
                if (closeOnBackdropClick && onClose) {
                    onClose();
                }
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;