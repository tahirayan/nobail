"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PersonalInfo from "@/components/widgets/personal-info";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container grid w-full grid-cols-1 items-start gap-8 py-4 lg:grid-cols-[24rem_minmax(0,100%)]">
      <PersonalInfo />
      {children}
    </div>
  );
}
