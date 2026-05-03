"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

interface DashboardNavProps {
  userEmail: string;
  userInitial: string;
}

export default function DashboardNav({
  userEmail,
  userInitial,
}: DashboardNavProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredNotes: { path: string; title: string }[] = [];

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 40);
    });
    return unsubscribe;
  }, [scrollY]);

  // ⌘K opens dropdown; Escape closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Click-outside closes the dropdown
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  function handleResultClick(path: string) {
    setOpen(false);
    setQuery("");
    searchRef.current?.blur();
    router.push(`/dashboard/note/${path}`);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(234, 229, 214, 0.97)"
          : "rgba(234, 229, 214, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: scrolled
          ? "rgba(61, 53, 41, 0.08)"
          : "rgba(61, 53, 41, 0.04)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          href="/dashboard"
          className="flex shrink-0 items-center gap-2 font-serif text-2xl text-bark tracking-tight leading-none"
        >
          Taproot
          <Image
            src="/images/taproot-logo.png"
            alt=""
            width={401}
            height={477}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Search bar — center, desktop only */}
        <div className="hidden sm:flex flex-1 justify-center px-4">
          <div ref={searchContainerRef} className="relative w-full max-w-sm">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-bark/35"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden
            >
              <circle cx="6.5" cy="6.5" r="4.5" />
              <path strokeLinecap="round" d="m10.5 10.5 3 3" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder="search your garden..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setSearchFocused(true);
                setOpen(true);
              }}
              onBlur={() => setSearchFocused(false)}
              className="w-full rounded-sm border border-bark/10 bg-cream-dark/40 pl-8 pr-10 py-1.5 font-sans text-sm text-bark placeholder:text-bark/35 focus:border-forest-dark/30 focus:bg-cream focus:outline-none focus:ring-0 transition-colors"
            />
            {!searchFocused && (
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-bark/30 select-none">
                ⌘K
              </kbd>
            )}

            {/* Results dropdown */}
            {open && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-sm border border-bark/10 bg-cream shadow-sm">
                {filteredNotes.length === 0 ? (
                  <p className="px-3 py-3 font-sans text-sm italic text-bark/40">
                    no notes match &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <ul>
                    {filteredNotes.map((note) => (
                      <li key={note.path}>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleResultClick(note.path)}
                          className="group flex w-full flex-col gap-0.5 px-3 py-2.5 text-left hover:bg-forest-dark/5"
                        >
                          <span className="font-sans text-sm font-medium leading-tight text-bark">
                            {note.title}
                          </span>
                          <span className="font-mono text-[10px] leading-tight text-bark/35 group-hover:text-bark/50">
                            {note.path}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {!query.trim() && (
                  <div className="border-t border-bark/6 px-3 py-1.5">
                    <span className="font-mono text-[10px] text-bark/30">
                      no notes indexed yet
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: avatar dropdown */}
        <div className="ml-auto shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-dark/10 text-forest-dark font-mono text-sm font-medium transition-colors hover:bg-forest-dark/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-dark/40"
                aria-label="Account menu"
              >
                {userInitial}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={handleSignOut}
                className="text-bark/60 focus:text-bark"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}
