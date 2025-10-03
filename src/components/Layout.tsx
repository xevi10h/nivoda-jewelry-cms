import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isExpanded ? "ml-64" : "ml-20"
        )}
      >
        {children}
      </main>
    </div>
  );
};
