import dayjs from "dayjs";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BottomNavInner } from "./bottom-nav-inner";

export async function BottomNav() {
  const homeRes = await getHomeData(dayjs().format("YYYY-MM-DD"));
  let calendarHref = "#";
  if (homeRes.status === 200) {
    const day = homeRes.data.todayWorkoutDay;
    if (day && !day.isRest) {
      calendarHref = `/workout-plans/${day.workoutPlanId}/days/${day.id}`;
    }
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-50 px-0 pb-0 safe-area-inset-bottom"
    >
      <Card className="gap-0 overflow-hidden rounded-none rounded-t-3xl border-x-0 border-b-0 py-0 shadow-[0_-8px_32px_-4px_rgba(0,0,0,0.08)] ring-1 ring-border/60">
        <CardContent className="px-2 pb-4 pt-3">
          <BottomNavInner calendarHref={calendarHref} />
        </CardContent>
      </Card>
    </nav>
  );
}
