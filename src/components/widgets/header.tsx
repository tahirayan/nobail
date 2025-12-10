"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 grid w-full place-items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex py-2 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex size-16 cursor-pointer items-center justify-center bg-primary p-2 transition-opacity hover:opacity-90">
            <div className="flex size-12 items-center justify-center border-2 border-white">
              <h1 className="font-bold text-white text-xs">NoBail</h1>
            </div>
          </div>
        </Link>
        {/* Logout Button */}
        <Button asChild size="sm" variant="ghost">
          <Link className="flex items-center gap-2" href="/">
            <LogOut className="size-4" />
            Logout
          </Link>
        </Button>
      </div>
    </header>
  );
}
