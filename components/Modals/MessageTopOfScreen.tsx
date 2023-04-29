import * as React from "react";
import { MessageType } from "@constants/helperEnums";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";

type Props = {
  message: string;
  duration: number;
  status: MessageType;
  indicator: boolean;
};

const MessageOnTopOfScreen = ({
  message,
  duration,
  status,
  indicator,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const refToOuterDiv: React.MutableRefObject<Element> = useRef(null);

  useEffect(() => {
    refToOuterDiv.current = document.querySelector<HTMLElement>("#message");
    setIsVisible(true);
    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [indicator, duration]);

  if (!indicator || !isVisible) return null;
  if (status == MessageType.Normal) {
    return createPortal(
      <div className="fixed w-screen flex  justify-center top-16 text-3xl text-green-700 z-10">
        <div>{message}</div>
      </div>,
      refToOuterDiv.current
    );
  }
  if (status == MessageType.Error) {
    return createPortal(
      <div className="fixed w-screen flex  justify-center top-16 text-3xl text-red-700 z-10">
        <div>{message}</div>
      </div>,
      refToOuterDiv.current
    );
  }
  if (status == MessageType.Warn) {
    return createPortal(
      <div className="fixed w-screen flex  justify-center top-16 text-3xl text-orange-400 z-10">
        <div>{message}</div>
      </div>,
      refToOuterDiv.current
    );
  }
};

export default MessageOnTopOfScreen;
