"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode, RefObject } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  containerRef?: RefObject<HTMLDivElement | null>;
  ariaLabel: string;
  overlayClassName?: string;
  panelClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  containerRef,
  ariaLabel,
  overlayClassName = "",
  panelClassName = "",
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/50 ${overlayClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={`relative bg-surface ${panelClassName}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
