import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import {
  getWorkoutPlanById,
  type GetWorkoutPlanById200WorkoutDaysItemWeekDay,
} from "@/app/_lib/api/fetch-generated";
import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { BottomNav } from "@/app/_components/home/bottom-nav";
import { WorkoutDayTopBar } from "@/app/_components/workout-day-detail/workout-day-top-bar";
import { WorkoutPlanNameBadge } from "@/app/_components/workout-plan-detail/workout-plan-name-badge";
import { WorkoutPlanDayListItem } from "@/app/_components/workout-plan-detail/workout-plan-day-list-item";

const WEEK_ORDER: Record<GetWorkoutPlanById200WorkoutDaysItemWeekDay, number> =
  {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  };

interface PageProps {
  params: Promise<{ workoutPlanId: string }>;
}

export default async function WorkoutPlanPage({ params }: PageProps) {
  const { workoutPlanId } = await params;

  const sessionResult = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const session =
    sessionResult &&
    typeof sessionResult === "object" &&
    "data" in sessionResult
      ? sessionResult.data
      : sessionResult;

  if (!session?.user) {
    redirect("/auth");
  }

  const res = await getWorkoutPlanById(workoutPlanId);

  if (res.status === 404 || res.status === 403) {
    redirect("/");
  }

  if (res.status !== 200) {
    redirect("/auth");
  }

  const plan = res.data;
  const sortedDays = [...plan.workoutDays].sort(
    (a, b) => WEEK_ORDER[a.weekDay] - WEEK_ORDER[b.weekDay],
  );

  return (
    <HomePageGuard>
      <div className="flex min-h-full flex-col bg-background pb-28">
        <WorkoutDayTopBar />
        <div className="mx-auto w-full max-w-lg flex-1 px-4 pb-4 pt-3">
          <div className="mb-5">
            <WorkoutPlanNameBadge name={plan.name} />
          </div>

          <section>
            <h2 className="mb-3 text-sm font-bold text-foreground">
              Dias de treino
            </h2>
            <ul className="flex flex-col gap-3">
              {sortedDays.map((day) => (
                <li key={day.id}>
                  <WorkoutPlanDayListItem
                    workoutPlanId={workoutPlanId}
                    day={day}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <BottomNav />
      </div>
    </HomePageGuard>
  );
}
