import { Badge } from "@/app/_components/ui/badge";

interface WorkoutPlanNameBadgeProps {
  name: string;
}

export function WorkoutPlanNameBadge({ name }: WorkoutPlanNameBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="h-auto rounded-full border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary"
    >
      {name}
    </Badge>
  );
}
