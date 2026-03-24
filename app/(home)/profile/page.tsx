import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import {
  type GetUserTrainData200,
  getUserTrainData,
  listWorkoutPlans,
} from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/app/_components/home/bottom-nav";
import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { ProfileScreen } from "@/app/_components/profile/profile-screen";

export default async function ProfilePage() {
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

  let trainData: GetUserTrainData200 = null;
  let workoutPlans: { id: string; name: string; isActive: boolean }[] = [];

  try {
    const [meRes, plansRes] = await Promise.all([
      getUserTrainData(),
      listWorkoutPlans(),
    ]);

    if (meRes.status === 401 || plansRes.status === 401) {
      redirect("/auth");
    }

    if (meRes.status === 200) {
      trainData = meRes.data;
    }

    if (
      plansRes.status === 200 &&
      plansRes.data &&
      Array.isArray(plansRes.data.workoutPlans)
    ) {
      workoutPlans = plansRes.data.workoutPlans;
    }
  } catch {
    trainData = null;
    workoutPlans = [];
  }

  const activePlan = workoutPlans.find((p) => p.isActive);
  const planLabel = activePlan?.name ?? "Sem plano ativo";

  const displayName =
    trainData?.userName?.trim() ||
    session.user.name?.trim() ||
    session.user.email ||
    "Atleta";

  return (
    <HomePageGuard>
      <div className="min-h-full space-y-0 bg-white pb-28">
        <ProfileScreen
          displayName={displayName}
          planLabel={planLabel}
          avatarUrl={session.user.image ?? null}
          trainData={trainData}
        />
        <BottomNav />
      </div>
    </HomePageGuard>
  );
}
