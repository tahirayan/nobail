import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  LogIn,
  MapPin,
  Ticket,
  User,
  MoreHorizontal,
  Hash,
  Layout,
  Folder,
  Tag,
  List,
  Utensils,
  Trophy,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BentoCard } from "@/components/ui/bento-card";
import { HostAvatar } from "@/components/widgets/host-avatar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 grid w-full place-items-center border-b bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between">
          <Link
            className="flex items-center gap-2 font-bold text-primary text-xl tracking-tight"
            href="/"
          >
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Ticket className="size-4" />
            </span>
            <span>NoBail</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="rounded-full font-medium"
              size="sm"
              variant="ghost"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container grid flex-grow place-items-center gap-20 py-16">
        {/* Hero Section */}
        <section className="flex w-full flex-col items-center gap-8 justify-self-center text-center md:w-2/3">
          <div className="grid place-items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-bold text-primary text-xs uppercase tracking-widest shadow-sm">
              <Ticket className="size-3" />
              Socialize
            </div>
            <h1 className="font-extrabold text-5xl text-foreground tracking-tight sm:text-7xl drop-shadow-sm">
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
              className="flex items-center justify-center h-12 rounded-full px-8 text-base font-semibold text-white bg-primary shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
              href="/login"
            >
              Log in to see meetups
            </Link>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="font-bold text-gray-900 text-xs">
                  1 Streak
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`size-1 rounded-full ${
                        i === 3 ? "bg-gray-200" : "bg-green-500"
                      }`}
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
            <div className="mt-auto pt-4 w-full">
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
                <Utensils className="size-24 -rotate-12" />
            </div>
            <div className="grid size-14 place-items-center rounded-full bg-orange-100 text-orange-600 z-10">
                <Calendar className="size-7" />
            </div>
            <div className="text-center z-10">
                <div className="text-2xl font-bold text-gray-900">10€</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prepay</div>
            </div>
             <div className="mt-auto pt-4 w-full z-10">
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
                <span className="block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    50%
                </span>
                <span className="text-sm font-bold text-gray-400 uppercase">OFF</span>
            </div>
            <div className="flex gap-1">
                {[40, 30, 20, 10].map((val) => (
                     <div key={val} className="flex size-6 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                        {val}
                     </div>
                ))}
            </div>
             <div className="mt-auto pt-4 w-full">
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
                <span className="font-bold text-gray-900 text-lg">1 <span className="font-medium text-gray-500 text-xs uppercase">Streak</span></span>
                <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`size-1.5 rounded-full ${i === 3 ? 'bg-gray-200' : 'bg-green-500'}`} />
                    ))}
                </div>
            </div>
            <Button size="sm" variant="ghost" className="h-7 rounded-full text-xs text-green-700 hover:bg-green-50 hover:text-green-800">
                Give away spot
            </Button>
             <div className="mt-auto pt-4 w-full">
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

      {/* Footer */}
      <footer className="grid w-full place-items-center p-8 text-center text-muted-foreground text-sm">
        <p className="rounded-full bg-secondary/50 px-8 py-3 font-medium backdrop-blur-sm">
          By the founder of Daily Meetups - NGO bringing internationals together
        </p>
      </footer>
    </div>
  );
}