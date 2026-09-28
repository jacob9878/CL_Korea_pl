"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type LoginModalContextValue = {
  isOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

const LoginModalContext = createContext<LoginModalContextValue | null>(null);

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openLogin: () => setIsOpen(true),
      closeLogin: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <LoginModalContext.Provider value={value}>{children}</LoginModalContext.Provider>;
}

export function useLoginModal() {
  const ctx = useContext(LoginModalContext);
  if (!ctx) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return ctx;
}
