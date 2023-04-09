import { createPortal } from "react-dom";
import { useRef, MutableRefObject, useEffect, useState } from "react";

const ModalWrapper = ({ children, open, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const ref: MutableRefObject<Element> = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  if (!open || !ref.current || !mounted) return null;
  
  return createPortal(
    <div className="absolute w-screen h-screen backdrop-blur-xl flex justify-center flex-col items-center z-20 bg-black/30 top-0 left-0">
      <div
        className="absolute left-2 top-2 text-6xl cursor-pointer	dark:text-white"
        onClick={() => onClose(false)}
      >
        X
      </div>

      <button onClick={onClose}></button>
      {children}
    </div>,
    ref.current
  );
};

export default ModalWrapper;
