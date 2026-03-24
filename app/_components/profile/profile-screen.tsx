import { Dumbbell, Ruler, Scale, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import type { GetUserTrainData200 } from "@/app/_lib/api/fetch-generated";
import { ProfileAvatar } from "@/app/_components/profile/profile-avatar";
import { ProfileLogoutButton } from "@/app/_components/profile/profile-logout-button";
import { cn } from "@/app/_lib/utils";

const CARD_BG = "rounded-2xl bg-[#F0F4FF] px-4 py-5 text-center shadow-sm";
const ICON_WRAP =
  "mx-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]";

function formatKg(weightInGrams: number): string {
  return (weightInGrams / 1000).toFixed(1);
}

function ProfileStatCard({
  icon,
  value,
  unitLabel,
}: {
  icon: ReactNode;
  value: ReactNode;
  unitLabel: string;
}) {
  return (
    <div className={cn(CARD_BG, "flex flex-col items-center gap-2.5")}>
      <div className={ICON_WRAP} aria-hidden>
        {icon}
      </div>
      <p className="text-[1.65rem] font-bold leading-none tracking-tight text-neutral-900 tabular-nums sm:text-[1.75rem]">
        {value}
      </p>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {unitLabel}
      </p>
    </div>
  );
}

function formatBodyFatRange(pct: number): string {
  if (pct <= 0) return "0%";
  const lo = Math.max(0, pct - 1);
  const hi = Math.min(100, pct + 2);
  return `${lo}–${hi}%`;
}

export interface ProfileScreenProps {
  displayName: string;
  planLabel: string;
  avatarUrl: string | null;
  trainData: GetUserTrainData200;
}

export function ProfileScreen({
  displayName,
  planLabel,
  avatarUrl,
  trainData,
}: ProfileScreenProps) {
  const iconStroke = 2;

  return (
    <main className="min-h-full space-y-6 bg-white px-5 pb-28 pt-6">
      <h1 className="text-lg font-bold uppercase tracking-tight text-neutral-900">
        FIT.AI
      </h1>

      <section className="flex items-center gap-4 pt-1">
        <ProfileAvatar imageUrl={avatarUrl} displayName={displayName} />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-neutral-900">
            {displayName}
          </p>
          <p className="mt-0.5 text-sm font-medium text-neutral-500">
            {planLabel}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 pt-1">
        <ProfileStatCard
          icon={<Scale className="size-5" strokeWidth={iconStroke} />}
          value={trainData ? formatKg(trainData.weightInGrams) : "—"}
          unitLabel="KG"
        />
        <ProfileStatCard
          icon={<Ruler className="size-5" strokeWidth={iconStroke} />}
          value={trainData ? String(trainData.heightInCentimeters) : "—"}
          unitLabel="CM"
        />
        <ProfileStatCard
          icon={<Dumbbell className="size-5" strokeWidth={iconStroke} />}
          value={
            trainData ? formatBodyFatRange(trainData.bodyFatPercentage) : "—"
          }
          unitLabel="GC"
        />
        <ProfileStatCard
          icon={<UserRound className="size-5" strokeWidth={iconStroke} />}
          value={trainData ? String(trainData.age) : "—"}
          unitLabel="ANOS"
        />
      </section>

      <ProfileLogoutButton />
    </main>
  );
}
