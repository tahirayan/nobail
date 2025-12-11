"use client";

import {
  Calendar,
  CheckCircle2,
  Percent,
  Ticket,
  Trophy,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { HostAvatar } from "@/components/widgets/host-avatar";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="grid w-full max-w-7xl place-items-center gap-20 px-4 py-16">
      {/* Hero Section */}
      <section className="flex w-full flex-col items-center gap-4 justify-self-center text-center md:w-2/3">
        <div className="grid place-items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-bold text-primary text-xs uppercase tracking-widest shadow-sm">
            <Ticket className="size-3" />
            Socialize
          </div>
          <h1 className="font-extrabold text-5xl text-foreground tracking-tight drop-shadow-sm sm:text-7xl">
            Structure That Adapts to <br />
            <span className="text-primary">Your Social Life</span>
          </h1>
          <p className="w-full text-muted-foreground text-xl leading-relaxed md:w-3/4">
            Hang out with people who never leave you hanging. We introduce you
            to the best places in Tallinn, prepaid to guarantee attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="flex h-12 items-center justify-center rounded-full bg-primary px-4 font-semibold text-base text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
            href="/login"
          >
            Log in to see meetups
          </Link>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BentoCard
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
          shadowColor="shadow-blue-500/20"
        >
          <div className="flex flex-col items-center gap-2">
            <HostAvatar name="Hamza Khan" size="md" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-900 text-sm">
                Hamza Khan
              </span>
              <span className="text-gray-500 text-xs">@hamzakkk</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-gray-50 p-2">
            <div className="flex flex-col items-start">
              <span className="font-bold text-gray-900 text-xs">1 Streak</span>
              <div className="flex gap-0.5">
                {[1, 2, 3].map((i) => (
                  <div
                    className={`size-1 rounded-full ${
                      i === 3 ? "bg-gray-200" : "bg-green-500"
                    }`}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
              <CheckCircle2 className="size-3 text-green-500" />
              <span className="font-bold text-[10px] text-green-700">
                Active
              </span>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col justify-end pt-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-bold text-xl">Log in</h3>
              <p className="text-muted-foreground text-sm">
                New meetups unlock as you fill your profile
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          gradient="bg-gradient-to-br from-orange-400 to-red-500"
          shadowColor="shadow-orange-500/20"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Utensils className="-rotate-12 size-24" />
          </div>
          <div className="z-10 grid size-14 place-items-center rounded-full bg-orange-100 text-orange-600">
            <Calendar className="size-7" />
          </div>
          <div className="z-10 text-center">
            <div className="font-bold text-2xl text-gray-900">10€</div>
            <div className="font-medium text-gray-500 text-xs uppercase tracking-wide">
              Prepay
            </div>
          </div>
          <div className="z-10 flex w-full flex-1 flex-col justify-end pt-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-bold text-xl">Reserve a Spot</h3>
              <p className="text-muted-foreground text-sm">
                Prepay 10€ for your food and drinks
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          shadowColor="shadow-purple-500/20"
        >
          <div className="grid size-14 place-items-center rounded-full bg-purple-100 text-purple-600">
            <Percent className="size-7" />
          </div>
          <div className="text-center">
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-extrabold text-4xl text-transparent">
              50%
            </span>
            <span className="font-bold text-gray-400 text-sm uppercase">
              OFF
            </span>
          </div>
          <div className="flex gap-1">
            {[40, 30, 20, 10].map((val) => (
              <div
                className="flex size-6 items-center justify-center rounded-full bg-gray-100 font-bold text-[9px] text-gray-500"
                key={val}
              >
                {val}
              </div>
            ))}
          </div>
          <div className="flex w-full flex-1 flex-col justify-end pt-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-bold text-xl">First-time visit</h3>
              <p className="text-muted-foreground text-sm">
                50% off. Early seats get 40/30/20/10%
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          gradient="bg-gradient-to-br from-green-400 to-emerald-600"
          shadowColor="shadow-green-500/20"
        >
          <div className="grid size-12 place-items-center rounded-full bg-green-100 text-green-600">
            <Trophy className="size-6" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-900 text-lg">
              1{" "}
              <span className="font-medium text-gray-500 text-xs uppercase">
                Streak
              </span>
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  className={`size-1.5 rounded-full ${
                    i === 3 ? "bg-gray-200" : "bg-green-500"
                  }`}
                  key={i}
                />
              ))}
            </div>
          </div>
          <Button
            className="h-7 rounded-full text-green-700 text-xs hover:bg-green-50 hover:text-green-800"
            size="sm"
            variant="ghost"
          >
            Give away spot
          </Button>
          <div className="flex w-full flex-1 flex-col justify-end pt-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-bold text-xl">Gotta bail?</h3>
              <p className="text-muted-foreground text-sm">
                Give away spot to keep your NoBail Prize streak
              </p>
            </div>
          </div>
        </BentoCard>
      </section>
    </main>
  );
}
