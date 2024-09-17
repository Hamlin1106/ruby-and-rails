"use client";

import { useContext } from "react";
import { Sidebar } from "./Sidebar";
import { SidebaProvider, SidebarContext } from "./SidemenuContext";
import { cn } from "@/components/util/utils";

const Content = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div className={cn(`h-full w-auto`, isOpen ? "lg:pl-72" : "lg:pl-28")}>
      {children}
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useContext(SidebarContext);
  return (
    <SidebaProvider>
      <div className="h-full">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </SidebaProvider>
  );
}
