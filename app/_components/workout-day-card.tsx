import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Timer } from "lucide-react";
import type { GetHomeData200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { WorkoutDayBadge } from "@/app/_components/home/workout-day-badge";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=1200&q=80";

function formatMinutes(seconds: number) {
  const m = Math.max(1, Math.round(seconds / 60));
  return `${m}min`;
}

interface WorkoutDayCardProps {
  workoutDay: GetHomeData200TodayWorkoutDay;
}

export function WorkoutDayCard({ workoutDay }: WorkoutDayCardProps) {
  if (!workoutDay || workoutDay.isRest) {
    return null;
  }

  const href = `/workout-plans/${workoutDay.workoutPlanId}/days/${workoutDay.id}`;

  return (
    <Link
      href={href}
      className="block rounded-xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="gap-0 overflow-hidden rounded-xl border-0 bg-foreground p-0 py-0 text-primary-foreground shadow-lg ring-1 ring-black/20 transition-[transform,box-shadow] hover:shadow-xl active:scale-[0.99]">
        <div className="relative aspect-16/11 w-full">
          <Image
            src={workoutDay.coverImageUrl ?? FALLBACK_COVER}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 480px"
            unoptimized={Boolean(workoutDay.coverImageUrl)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/45" />
          <div className="absolute left-3 top-3">
            <WorkoutDayBadge weekDay={workoutDay.weekDay} />
          </div>
          <CardContent className="absolute inset-x-0 bottom-0 border-0 bg-transparent px-4 pb-4 pt-8 shadow-none ring-0">
            <p className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
              {workoutDay.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="h-7 rounded-full border border-white/20 bg-white/15 px-2.5 text-xs font-medium text-white backdrop-blur-sm [&>svg]:size-3.5"
              >
                <Timer strokeWidth={2} aria-hidden />
                {formatMinutes(workoutDay.estimatedDurationInSeconds)}
              </Badge>
              <Badge
                variant="secondary"
                className="h-7 rounded-full border border-white/20 bg-white/15 px-2.5 text-xs font-medium text-white backdrop-blur-sm [&>svg]:size-3.5"
              >
                <Dumbbell strokeWidth={2} aria-hidden />
                {workoutDay.exercisesCount} exercícios
              </Badge>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
