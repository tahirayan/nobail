import { cn } from "@/lib/utils";

interface BentoCardProps extends React.ComponentProps<"div"> {
  gradient: string;
  shadowColor: string;
  children: React.ReactNode;
}

export function BentoCard({
  gradient,
  shadowColor,
  children,
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full rounded-2xl p-2 shadow-xl transition-transform group-hover:scale-105 sm:min-w-3xs",
        gradient,
        shadowColor,
        className
      )}
      {...props}
    >
      <div className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-white bg-white/95 p-4 shadow">
        {children}
      </div>
    </div>
  );
}
