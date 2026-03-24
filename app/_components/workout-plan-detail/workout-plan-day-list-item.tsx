import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Timer } from "lucide-react";
import type { GetWorkoutPlanById200WorkoutDaysItem } from "@/app/_lib/api/fetch-generated";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { WorkoutDayBadge } from "@/app/_components/home/workout-day-badge";
import { cn } from "@/app/_lib/utils";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80";

function coverImageSrc(url: string | null | undefined): string {
  const t = url?.trim();
  if (!t) return FALLBACK_COVER;
  if (t.startsWith("https://") || t.startsWith("http://")) return t;
  return FALLBACK_COVER;
}

function formatMinutes(seconds: number) {
  const m = Math.max(1, Math.round(seconds / 60));
  return `${m}min`;
}

interface WorkoutPlanDayListItemProps {
  workoutPlanId: string;
  day: GetWorkoutPlanById200WorkoutDaysItem;
}

export function WorkoutPlanDayListItem({
  workoutPlanId,
  day,
}: WorkoutPlanDayListItemProps) {
  const href = `/workout-plans/${workoutPlanId}/days/${day.id}`;
  const imageSrc = coverImageSrc(day.coverImageUrl);

  return (
    <Link
      href={href}
      className="block rounded-xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card
        className={cn(
          "gap-0 overflow-hidden rounded-xl border-border/80 py-0 shadow-sm ring-1 ring-border/40 transition-[transform,box-shadow] hover:shadow-md active:scale-[0.99]",
          day.isRest && "opacity-90",
        )}
      >
        <CardContent className="flex gap-3 p-0">
          <div
            className={cn(
              "relative aspect-4/3 w-[104px] shrink-0 sm:w-[120px]",
              day.isRest && "grayscale-[0.35]",
            )}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover object-center"
              sizes="120px"
              unoptimized={imageSrc !== FALLBACK_COVER}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute left-2 top-2">
              <WorkoutDayBadge weekDay={day.weekDay} />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-3 pr-3">
            <p className="line-clamp-2 text-base font-bold leading-tight text-foreground">
              {day.name}
            </p>
            {day.isRest ? (
              <p className="text-xs font-medium text-muted-foreground">
                Dia de descanso
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full px-2 text-[11px] font-medium [&>svg]:size-3"
                >
                  <Timer strokeWidth={2} aria-hidden />
                  {formatMinutes(day.estimatedDurationInSeconds)}
                </Badge>
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full px-2 text-[11px] font-medium [&>svg]:size-3"
                >
                  <Dumbbell strokeWidth={2} aria-hidden />
                  {day.exercisesCount} exercícios
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
