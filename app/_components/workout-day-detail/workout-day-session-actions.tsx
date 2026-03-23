"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import {
  completeWorkoutSessionAction,
  startWorkoutSessionAction,
} from "@/app/_lib/actions/workout-day";

interface WorkoutDaySessionActionsProps {
  workoutPlanId: string;
  workoutDayId: string;
  hasCompletedSession: boolean;
  activeSessionId: string | null;
}

export function WorkoutDaySessionActions({
  workoutPlanId,
  workoutDayId,
  hasCompletedSession,
  activeSessionId,
}: WorkoutDaySessionActionsProps) {
  const [pending, startTransition] = useTransition();

  if (hasCompletedSession) {
    return (
      <Button
        type="button"
        variant="ghost"
        className="h-11 w-full rounded-xl text-base font-semibold"
        disabled
      >
        Concluído!
      </Button>
    );
  }

  if (activeSessionId) {
    return (
      <Button
        type="button"
        variant="default"
        className="h-11 w-full rounded-xl text-base font-semibold shadow-md"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const result = await completeWorkoutSessionAction(
              workoutPlanId,
              workoutDayId,
              activeSessionId,
            );
            if (!result.ok) {
              toast.error(result.message);
            }
          });
        }}
      >
        {pending ? "Salvando…" : "Marcar como concluído"}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="default"
      className="h-11 w-full rounded-xl text-base font-semibold shadow-md"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const result = await startWorkoutSessionAction(
            workoutPlanId,
            workoutDayId,
          );
          if (!result.ok) {
            toast.error(result.message);
          }
        });
      }}
    >
      {pending ? "Iniciando…" : "Iniciar treino"}
    </Button>
  );
}
