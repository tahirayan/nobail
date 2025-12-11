"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Show nothing while redirecting
  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email);
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid flex-grow place-items-center bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary">
      <div className="relative grid w-full max-w-md gap-4 overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-to-b from-card to-background p-10 shadow-2xl shadow-primary/5">
        <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.03]">
          <LogIn className="size-40 rotate-12 text-foreground" />
        </div>

        <div className="relative z-10 grid gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl text-foreground leading-tight tracking-tight">
              Ready to <span className="text-primary">No(t)Bail</span> on other
              people ever again?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Work email verifies employment - to have access to meetups
              exclusive for your company.
            </p>
          </div>

          <form
            className="grid gap-6 rounded-[2rem] border border-border/30 bg-background/50 p-8 shadow-sm backdrop-blur-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-3">
              <label
                className="font-semibold text-foreground/80 text-sm"
                htmlFor="email"
              >
                Work Email
              </label>
              <Input
                className="h-14 rounded-2xl border-border/40 bg-white/50 px-6 shadow-sm transition-all focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="workemail@company.com"
                type="email"
                value={email}
              />
            </div>
            <Button
              className="h-14 w-full rounded-2xl font-semibold text-lg shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
              size="lg"
              type="submit"
            >
              Send me a magic link
            </Button>
            <p className="text-center text-muted-foreground text-xs">
              By continuing, you agree to our Terms & Privacy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
