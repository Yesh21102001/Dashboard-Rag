import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function Icon({ name, className, filled }: IconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      data-icon={name}
      data-weight={filled ? "fill" : undefined}
    >
      {name}
    </span>
  );
}
