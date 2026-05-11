"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useSidebar } from "@/components/ui/sidebar";

export function SidebarCloseHandler() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile) return;

    setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return null;
}