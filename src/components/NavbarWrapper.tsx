"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar on v2 prototype page
  if (pathname.startsWith("/v2")) return null;

  return <Navbar />;
}
