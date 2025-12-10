import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary">
      <div className="relative grid gap-8 overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-to-b from-card to-background p-10 shadow-2xl shadow-primary/5 max-w-md w-full mx-auto">
        <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.03]">
          <LogIn className="size-40 rotate-12 text-foreground" />
        </div>

        <div className="relative z-10 grid gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl tracking-tight text-foreground leading-tight">
              Ready to <span className="text-primary">No(t)Bail</span> on other people ever again?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Work email verifies employment - to have access to meetups exclusive
              for your company.
            </p>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-border/30 bg-background/50 p-8 shadow-sm backdrop-blur-sm">
            <div className="grid gap-3">
              <label className="font-semibold text-sm text-foreground/80" htmlFor="email">
                Work Email
              </label>
              <Input
                className="h-14 rounded-2xl border-border/40 bg-white/50 px-6 shadow-sm transition-all focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
                id="email"
                placeholder="workemail@company.com"
                type="email"
              />
            </div>
            <Button
              asChild
              className="h-14 w-full rounded-2xl text-lg font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
              size="lg"
            >
              <Link href="/dashboard">Send me a magic link</Link>
            </Button>
            <p className="text-center text-muted-foreground text-xs">
              By continuing, you agree to our Terms & Privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
