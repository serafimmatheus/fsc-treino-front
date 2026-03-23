"use server";

import { revalidatePath } from "next/cache";
import {
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

export async function startWorkoutSessionAction(
  workoutPlanId: string,
  workoutDayId: string,
) {
  const res = await startWorkoutSession(workoutPlanId, workoutDayId);
  const path = `/workout-plans/${workoutPlanId}/days/${workoutDayId}`;
  if (res.status === 201) {
    revalidatePath(path);
    revalidatePath("/");
    return { ok: true as const };
  }
  return {
    ok: false as const,
    status: res.status,
    message:
      "data" in res && res.data && "message" in res.data
        ? String(res.data.message)
        : "Não foi possível iniciar o treino.",
  };
}

export async function completeWorkoutSessionAction(
  workoutPlanId: string,
  workoutDayId: string,
  sessionId: string,
) {
  const res = await updateWorkoutSession(
    workoutPlanId,
    workoutDayId,
    sessionId,
    { completedAt: new Date().toISOString() },
  );
  const path = `/workout-plans/${workoutPlanId}/days/${workoutDayId}`;
  if (res.status === 200) {
    revalidatePath(path);
    revalidatePath("/");
    return { ok: true as const };
  }
  return {
    ok: false as const,
    status: res.status,
    message:
      "data" in res && res.data && "message" in res.data
        ? String(res.data.message)
        : "Não foi possível concluir o treino.",
  };
}
