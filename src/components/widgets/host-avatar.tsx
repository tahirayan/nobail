import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type HostAvatarProps = {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-50 w-50", // 200x200px equivalent
};

const fallbackSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-4xl",
};

export function HostAvatar({
  name,
  avatar,
  size = "md",
  className,
}: HostAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage alt={name} src={avatar} />
      <AvatarFallback
        className={cn(
          "bg-primary font-semibold text-primary-foreground",
          fallbackSizeClasses[size]
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
