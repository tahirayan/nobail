"use client";

import { BarChart3, LogOut, Menu, Settings, Star, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth-context";
import { StreakProgress } from "./streak-progress";

type MenuItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
};

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="size-4" />,
    },
    {
      label: "Stats",
      href: "/dashboard/stats",
      icon: <BarChart3 className="size-4" />,
    },
    {
      label: "Ratings",
      href: "/dashboard/ratings",
      icon: <Star className="size-4" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="size-4" />,
    },
  ];

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open menu"
          className="size-9"
          size="icon"
          variant="ghost"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-80 flex-col" side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu with profile, stats, ratings, and settings
          </SheetDescription>
        </SheetHeader>

        {/* Streak Progress */}
        <div className="py-4">
          <StreakProgress variant="full" />
        </div>

        <Separator />

        {/* Menu Items */}
        <nav className="flex flex-1 flex-col gap-1 py-4">
          {menuItems.map((item) =>
            item.href ? (
              <Button
                asChild
                className="justify-start gap-3"
                key={item.label}
                onClick={() => handleItemClick(item)}
                variant="ghost"
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ) : (
              <Button
                className="justify-start gap-3"
                key={item.label}
                onClick={() => handleItemClick(item)}
                variant="ghost"
              >
                {item.icon}
                {item.label}
              </Button>
            )
          )}
        </nav>

        <Separator />

        {/* Logout */}
        <div className="py-4">
          <Button
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            variant="ghost"
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
