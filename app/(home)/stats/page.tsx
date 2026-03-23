import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { authClient } from "@/app/_lib/auth-client";
import { getStats } from "@/app/_lib/api/fetch-generated";
import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { BottomNav } from "@/app/_components/home/bottom-nav";
import { StatsScreen } from "@/app/_components/stats/stats-screen";
import { getStatsWindowStart } from "@/app/_components/stats/stats-heatmap-utils";

export default async function StatsPage() {
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

  const today = dayjs();
  const from = getStatsWindowStart(today).format("YYYY-MM-DD");
  const to = today.format("YYYY-MM-DD");

  const statsRes = await getStats({ from, to });

  if (statsRes.status !== 200) {
    redirect("/auth");
  }

  return (
    <HomePageGuard>
      <div className="flex min-h-dvh flex-col bg-background">
        <StatsScreen stats={statsRes.data} />
        <BottomNav />
      </div>
    </HomePageGuard>
  );
}
