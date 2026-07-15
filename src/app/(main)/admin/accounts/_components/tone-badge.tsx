import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Tone = "success" | "warning" | "danger" | "muted" | "info";

const toneClasses: Record<Tone, string> = {
  success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400",
  info: "bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-400",
  muted: "bg-muted text-muted-foreground hover:bg-muted",
};

export function ToneBadge({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return <Badge className={cn("border-transparent font-medium", toneClasses[tone], className)}>{children}</Badge>;
}
