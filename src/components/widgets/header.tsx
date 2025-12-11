"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { HamburgerMenu } from "./hamburger-menu";
import { RewardsDialog } from "./rewards-dialog";
import { StreakProgress } from "./streak-progress";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 grid w-full place-items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex items-center justify-between gap-4 py-2">
        {/* Logo */}
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <div className="flex size-14 cursor-pointer items-center justify-center bg-primary p-2 transition-opacity hover:opacity-90">
            <div className="flex size-10 items-center justify-center border-2 border-white">
              <h1 className="font-bold text-[10px] text-white">NoBail</h1>
            </div>
          </div>
        </Link>

        {/* Center: Streak Progress (only when authenticated) */}
        {isAuthenticated ? (
          <div className="hidden flex-1 justify-center sm:flex">
            <StreakProgress variant="compact" />
          </div>
        ) : null}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <RewardsDialog />
              <HamburgerMenu />
            </>
          ) : (
            <Button
              asChild
              className="rounded-full font-medium"
              size="sm"
              variant="ghost"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
