import { cn } from "@/lib/utils";

interface BentoCardProps extends React.ComponentProps<"div"> {
  gradientType?: "blue" | "orange" | "purple" | "green";
  children: React.ReactNode;
}

export function BentoCard({
  gradientType = "blue",
  children,
  className,
  ...props
}: BentoCardProps) {
  const gradientClass = {
    blue: "gradient-subtle-blue",
    orange: "gradient-subtle-orange",
    purple: "gradient-subtle-purple",
    green: "gradient-subtle-green",
  }[gradientType];

  return (
    <div
      className={cn(
        "relative min-h-[320px] w-full p-6 sm:min-w-3xs",
        "border border-border/40",
        "flex flex-col items-center justify-between gap-4",
        gradientClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
