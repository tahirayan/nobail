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
        "group relative flex flex-col rounded-4xl bg-secondary/30 p-2 transition-all hover:bg-secondary/50",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center justify-center py-4">
        <div
          className={cn(
            "relative aspect-square w-full sm:min-w-3xs rounded-[2rem] p-2 shadow-xl transition-transform group-hover:scale-105",
            gradient,
            shadowColor
          )}
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-white/95 p-8 shadow-inner relative overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
