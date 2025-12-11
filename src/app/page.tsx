"use client";

import { Calendar, Percent, Ticket, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BentoCard } from "@/components/ui/bento-card";
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
    <main className="grid w-full place-items-center px-4 py-16">
      <div className="w-full max-w-7xl">
        {/* Hero Section - Split Layout */}
        <section className="grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex w-fit items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1.5 font-semibold text-primary text-xs uppercase tracking-wider">
              <Ticket className="size-3.5" />
              Socialize
            </div>

            <h1 className="font-display font-extrabold text-5xl text-foreground tracking-tight md:text-6xl lg:text-7xl">
              Structure That Adapts to{" "}
              <span className="text-primary">Your Social Life</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
              Hang out with people who never leave you hanging. We introduce you
              to the best places in Tallinn, prepaid to guarantee attendance.
            </p>

            <div className="flex items-center gap-4">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-semibold text-base text-white transition-colors hover:bg-primary/90"
                href="/login"
              >
                Log in to see meetups
              </Link>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="flex items-center justify-center">
            <div className="relative grid aspect-square w-full max-w-md place-items-center bg-gradient-to-br from-primary/5 to-primary/10 p-8">
              <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 opacity-60">
                {[...Array(4)].map((_, i) => (
                  <div
                    className="border border-primary/20 bg-background/40"
                    key={i}
                  />
                ))}
              </div>
              <div className="relative text-center">
                <div className="font-bold font-display text-6xl text-primary">
                  NoBail
                </div>
                <p className="text-muted-foreground text-sm">
                  Social events platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="grid w-full gap-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Log in */}
          <BentoCard gradientType="blue">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 border-2 border-blue-200/60" />
              <div className="absolute inset-3 border border-blue-300/40 bg-blue-50/50" />
              <User
                className="relative size-10 text-blue-600"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex w-full flex-col gap-2 text-center">
              <h3 className="font-semibold text-foreground text-xl">Log in</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                New meetups unlock as you fill your profile
              </p>
            </div>
          </BentoCard>

          {/* Card 2: Reserve a Spot */}
          <BentoCard gradientType="orange">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 border-2 border-primary/30" />
              <div className="absolute inset-3 border border-primary/20 bg-primary/5" />
              <Calendar
                className="relative size-10 text-primary"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="font-bold text-3xl text-foreground">10€</div>
              <div className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Prepay
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 text-center">
              <h3 className="font-semibold text-foreground text-xl">
                Reserve a Spot
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Prepay 10€ for your food and drinks
              </p>
            </div>
          </BentoCard>

          {/* Card 3: First-time visit */}
          <BentoCard gradientType="purple">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 border-2 border-purple-200/60" />
              <div className="absolute inset-3 border border-purple-200/40 bg-purple-50/50" />
              <Percent
                className="relative size-10 text-purple-600"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-5xl text-foreground">
                  50
                </span>
                <span className="font-bold text-2xl text-foreground">%</span>
              </div>
              <div className="flex gap-1">
                {[40, 30, 20, 10].map((val) => (
                  <div
                    className="flex size-8 items-center justify-center border border-purple-200 bg-purple-50/50 font-semibold text-[11px] text-purple-600"
                    key={val}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 text-center">
              <h3 className="font-semibold text-foreground text-xl">
                First-time visit
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                50% off. Early seats get 40/30/20/10%
              </p>
            </div>
          </BentoCard>

          {/* Card 4: Gotta bail? */}
          <BentoCard gradientType="green">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 border-2 border-green-200/60" />
              <div className="absolute inset-3 border border-green-200/40 bg-green-50/50" />
              <Trophy
                className="relative size-10 text-green-600"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-3xl text-foreground">1</span>
                <span className="font-medium text-muted-foreground text-sm uppercase">
                  Streak
                </span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    className={`size-2.5 ${
                      i === 3
                        ? "border border-green-300 bg-green-50"
                        : "bg-green-500"
                    }`}
                    key={i}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 text-center">
              <h3 className="font-semibold text-foreground text-xl">
                Gotta bail?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Give away spot to keep your NoBail Prize streak
              </p>
            </div>
          </BentoCard>
        </section>
      </div>
    </main>
  );
}
