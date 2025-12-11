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
    <div className="grid flex-grow place-items-center py-4">
      <div className="container grid grid-cols-1 items-start gap-4 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <PersonalInfo />
        {children}
      </div>
    </div>
  );
}
