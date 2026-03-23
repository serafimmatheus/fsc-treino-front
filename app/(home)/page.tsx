import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { authClient } from "../_lib/auth-client";
import { redirect } from "next/navigation";
import { getHomeData } from "../_lib/api/fetch-generated";
import dayjs from "dayjs";
import { headers } from "next/headers";
import { HomeHeader } from "@/app/_components/home/home-header";
import { ConsistencySection } from "@/app/_components/home/consistency-section";
import { TodayWorkoutSection } from "@/app/_components/home/today-workout-section";
import { BottomNav } from "@/app/_components/home/bottom-nav";

export default async function Home() {
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

  const homeRes = await getHomeData(dayjs().format("YYYY-MM-DD"));

  if (homeRes.status !== 200) {
    redirect("/auth");
  }

  const { todayWorkoutDay, consistencyByDay, workoutStreak } = homeRes.data;

  const firstName =
    session.user.name?.trim().split(/\s+/)[0] ?? session.user.email ?? null;

  return (
    <HomePageGuard>
      <div className="min-h-full space-y-4 bg-background pb-28">
        <HomeHeader userName={firstName} />
        <ConsistencySection
          consistencyByDay={consistencyByDay}
          workoutStreak={workoutStreak}
        />
        <TodayWorkoutSection todayWorkoutDay={todayWorkoutDay} />
        <BottomNav />
      </div>
    </HomePageGuard>
  );
}
