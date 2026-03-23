import type {
  GetHomeData200TodayWorkoutDay,
  GetWorkoutDayById200WeekDay,
} from "@/app/_lib/api/fetch-generated";
import { Calendar } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";

export type WorkoutWeekDay =
  | NonNullable<GetHomeData200TodayWorkoutDay>["weekDay"]
  | GetWorkoutDayById200WeekDay;

const WEEKDAY_LABEL: Record<WorkoutWeekDay, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

export function WorkoutDayBadge({ weekDay }: { weekDay: WorkoutWeekDay }) {
  return (
    <Badge
      variant="secondary"
      className="h-auto rounded-full border border-white/25 bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-md [&>svg]:size-3.5"
    >
      <Calendar strokeWidth={2} aria-hidden />
      {WEEKDAY_LABEL[weekDay]}
    </Badge>
  );
}
