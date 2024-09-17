import { createContext, useState } from "react";

export const SidebarContext = createContext({
  isOpen: true,
  setIsOpen: (isOpen: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};
export const SidebaProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
