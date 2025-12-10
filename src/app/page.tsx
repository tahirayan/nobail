import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center bg-background font-sans text-foreground">
      {/* Landing Page Header */}
      <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 grid place-items-center">
        <div className="container flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>NoBail</span>
          </Link>
          {/* Login Button */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex w-full flex-col items-center gap-16 px-6 pt-24 pb-16 sm:px-16 container">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="flex flex-col items-center gap-2 text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span>Hang out with people who never leave you hanging</span>
            <span className="text-2xl font-normal text-muted-foreground sm:text-3xl">
              (read: never bail)
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[42rem]">
            We introduce you to best places in Tallinn. All they ask is that we prepay for food & drinks to guarantee attendance.
          </p>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button size="lg" asChild>
                <Link href="#login">Log in to see your meetups</Link>
              </Button>
              <Button variant="ghost" size="lg">
                How it works
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Log in with work email to access your company’s meetups.
            </p>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full grid gap-8 max-w-[42rem]">
          <h2 className="text-2xl font-bold text-center">How it works</h2>
          <div className="grid gap-6">
            <div className="flex gap-4 items-start">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</span>
              <p className="flex items-center gap-2 pt-1 flex-wrap">
                <strong>Log in</strong> <ArrowRight className="size-4" /> new meetups unlock as you fill your profile
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</span>
              <p className="flex items-center gap-2 pt-1 flex-wrap">
                <strong>Reserve a Spot</strong> <ArrowRight className="size-4" /> prepay 10€ for your food and drinks
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</span>
              <p className="pt-1">
                <strong>First-time visit</strong> = 50% off. Early seats get 40/30/20/10%
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</span>
              <p className="pt-1">
                <strong>Gotta bail?</strong> Give away spot to keep your NoBail Prize streak
              </p>
            </div>
          </div>
        </section>

        {/* Login / Auth Section */}
        <section id="login" className="w-full rounded-xl border bg-card p-8 shadow-sm max-w-[28rem]">
          <div className="flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                Ready to No(t)Bail on other people ever again?
              </h2>
              <p className="text-sm text-muted-foreground">
                Work email verifies employment - to have access to meetups exclusive for your company.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <Input 
                type="email" 
                placeholder="workemail@company.com" 
                className="h-12"
              />
              <Button size="lg" className="w-full" asChild>
                <Link href="/dashboard">Send me a magic link</Link>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms & Privacy.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground">
          <p>
            By the founder of Daily Meetups - NGO bringing internationals together every day for the past 3 years
          </p>
        </footer>
      </main>
    </div>
  );
}
